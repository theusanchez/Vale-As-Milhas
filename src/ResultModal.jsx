import { useEffect, useState } from 'react'
import clsx from 'clsx'
import { FaCheck } from 'react-icons/fa'
import { IoMdClose } from "react-icons/io";




export const ResultModal = ({ resultByCategory, onClose }) => {

    const [betterOption, setBetterOption] = useState(null)

    const whichOneIsBetter = () => {
        if (resultByCategory.length < 2) return null

        const allValuesCalulated = []
        resultByCategory.forEach((result) => {
            allValuesCalulated.push({
                option: result.partnerSiteName,
                pointsValues: ((result.totalPointsAmount * result.bonusCia) / 1000) * result.priceForAThousand,
                totalValue: result.value - ((result.totalPointsAmount * result.bonusCia) / 1000) * result.priceForAThousand,
                originalValue: result.value
            })
        })

        const best = allValuesCalulated.reduce((prev, current) => {
            return (prev.totalValue < current.totalValue) ? prev : current
        })

        return best

    }

    useEffect(() => {
        const bestOption = whichOneIsBetter()
        setBetterOption(bestOption)
    }, [resultByCategory])

    return (
        <div className='fixed inset-0 bg-black/80 bg-opacity-50 flex items-center justify-center z-50' 
            onClick={onClose}
        >
            <div className='bg-base-200 max-w-4xl max-h-[90vh] overflow-auto rounded-lg shadow-2xl' 
                onClick={(e) => e.stopPropagation()}
            >
                <div className='flex flex-col gap-4 border border-slate-300 rounded-md p-4 shadow-lg'>
                <div className='flex justify-end cursor-pointer' onClick={onClose}>
                    <IoMdClose />
                </div>
                    <div className='flex justify-center'>
                        <h1 className='text-2xl font-bold'>Resultado</h1>
                    </div>
                    <div className='flex flex-row gap-4 '>

                        {resultByCategory.map((result) => (
                            <div className={clsx('shadow-lg',{
                                'bg-base-300': betterOption?.option === result.partnerSiteName,
                            })}>
                                
                                <div 
                                    key={result.categoryId} 
                                    className='flex flex-col gap-2 border border-slate-300 rounded-md p-4 w-58'
                                >
                                    <div className='flex flex-row'>
                                        <h2 className='text-xl font-bold'>{result.partnerSiteName}</h2>
                                        {betterOption?.option === result.partnerSiteName && (
                                            <p className='text-green-600 p-1 text-xs'><FaCheck /></p>
                                        )}
                                    </div>
                                    
                                    <div className='flex flex-col'>
                                        <p className='text-xs'>Valor: </p>
                                        <p className='font-bold'>R${result.value}</p>
                                    </div>
                                    <div>
                                        <p className='text-xs'>Pontos brutos</p>
                                        <p className='font-bold'>{result.totalPointsAmount}</p>
                                    </div>
                                    <div>
                                        <p className='text-xs'>Pontos gerados</p>
                                        <p className='font-bold'>{result.totalPointsAmount * result.bonusCia}</p>

                                    </div>
                                </div>
                            </div>
                        ))}

                    </div>
                    <div className='flex justify-center flex-col gap-2 items-center 
                            border-slate-300 p-2 bg-base-300 rounded-md shadow-lg'
                    >
                        <h2>A melhor opção é 
                            <span className='font-bold text-purple-600'> {betterOption?.option}</span>.
                        </h2>
                        <p>O valor final descontando os pontos gerados é de 
                            <span className='font-bold text-purple-600'>    R${betterOption?.totalValue.toFixed(2)}</span>.
                        </p>
                        <p>Você ganharia <span className='font-bold text-purple-600'>R${betterOption?.pointsValues.toFixed(2)}</span> ao vender essas milhas.</p>
                        
                    </div>
                </div>
            </div>
        </div>
    )
}
