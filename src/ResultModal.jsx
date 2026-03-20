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
                originalValue: result.value,
                categoryId: result.categoryId
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
            <div className='bg-gray-800 max-w-4xl max-h-[90vh] overflow-auto rounded-lg shadow-2xl'
                onClick={(e) => e.stopPropagation()}
            >
                <div className='flex flex-col gap-4 border border-gray-700 rounded-md p-4 shadow-lg'>
                    <div className='flex justify-end cursor-pointer text-gray-400 hover:text-white transition-colors' onClick={onClose}>
                        <IoMdClose />
                    </div>
                    <div className='flex justify-center'>
                        <h1 className='text-2xl font-bold text-white'>Resultado</h1>
                    </div>
                    <div className='flex flex-row gap-4 '>

                        {resultByCategory.map((result) => (
                            <div className={clsx('shadow-lg rounded-md', {
                                'bg-gray-700 ring-2 ring-purple-500': betterOption?.option === result.partnerSiteName,
                                'bg-gray-800': betterOption?.option !== result.partnerSiteName,
                            })}>

                                <div
                                    key={result.categoryId}
                                    className={clsx('flex flex-col gap-2 border border-gray-600 rounded-md p-4 w-58', {
                                        'h-full': result.categoryId === 3
                                    })}
                                >
                                    <div className='flex flex-row'>
                                        <h2 className='text-xl font-bold text-white'>{result.partnerSiteName}</h2>
                                        {betterOption?.option === result.partnerSiteName && (
                                            <p className='text-green-500 p-1 text-xs'><FaCheck /></p>
                                        )}
                                    </div>

                                    <div className='flex flex-col'>
                                        <p className='text-xs text-gray-400'>Valor: </p>
                                        <p className='font-bold text-white'>R${result.value}</p>
                                    </div>
                                    {result.categoryId !== 3 && (
                                        <div>

                                            <div>
                                                <p className='text-xs text-gray-400'>Pontos</p>
                                                <p className='font-bold text-white'>{result.totalPointsAmount.toFixed(0)}</p>
                                            </div>
                                            <div>
                                                <p className='text-xs text-gray-400'>Pontos gerados (c/ bonus)</p>
                                                <p className='font-bold text-white'>{(result.totalPointsAmount * result.bonusCia).toFixed(0)}</p>
                                            </div>
                                            <div>
                                                <p className='text-xs text-gray-400'>Custo Efetivo</p>
                                                <p className='font-bold text-white'>
                                                    {`R$ ${(result.value - ((result.totalPointsAmount * result.bonusCia) / 1000) * result.priceForAThousand).toFixed(2)}`}
                                                </p>
                                            </div>
                                        </div>
                                    )}
                                </div>

                            </div>
                        ))}

                    </div>
                    <div className='flex justify-center flex-col gap-2 items-center 
                            border-gray-600 p-2 bg-gray-700 rounded-md shadow-lg'
                    >
                        <h2 className='text-gray-200'>A melhor opção é
                            <span className='font-bold text-purple-400'> {betterOption?.option}</span>.
                        </h2>
                        {betterOption?.categoryId !== 3 && (
                            <div>
                                <p className='text-gray-200'>O valor final descontando os pontos gerados é de
                                    <span className='font-bold text-purple-400'>    R${betterOption?.totalValue.toFixed(2)}</span>.
                                </p>
                                
                                <p className='text-gray-200'>Você ganharia <span className='font-bold text-purple-400'>R${betterOption?.pointsValues.toFixed(2)}</span> ao vender essas milhas.</p>
                            </div>
                        )}

                    </div>
                </div>
            </div>
        </div>
    )
}
