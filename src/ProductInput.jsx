import { use, useEffect, useMemo, useState } from 'react'
import CATEGORIES from "./utils"
import { IoMdClose } from "react-icons/io";


export const ProductInput = ({ selectedCategory, setResultByCategory, resultByCategory, onRemove }) => {

    const [value, setValue] = useState(null)
    const [multiplier, setMultiplier] = useState(null)
    const [partnerSiteName, setPartnerSiteName] = useState("")
    const [isReal, setIsReal] = useState(true)
    const [dolarValue, setDolarValue] = useState(null)
    const [bonusCia, setBonusCia] = useState(null)
    const [priceForAThousand, setPriceForAThousand] = useState(null)

    const conversionUrl = import.meta.env.VITE_AWESOMEAPI_URL
    const conversionToken = import.meta.env.VITE_AWESOMEAPI_TOKEN

    const url = `${conversionUrl}/USD-BRL?token=${conversionToken}`

    const fullObjectCategory = useMemo(() => {
        return CATEGORIES.find((e) => e.id == selectedCategory.category)
    }, [selectedCategory])

    const handleResult = () => { 
        if (!isReal && (!dolarValue || dolarValue === 0)) {
            console.log('Aguardando valor do dólar...')
            return
        }

        const alreadyExists = resultByCategory.find((e) => e.categoryId == selectedCategory.id)
        const calculatedValue = isReal ? value : value / dolarValue

        if (alreadyExists) {
            const filtered = resultByCategory.filter((e) => e.categoryId != selectedCategory.id)
            setResultByCategory([...filtered, {
                categoryId: selectedCategory.id,
                partnerSiteName: selectedCategory.id == 2 ? 'Shopping Livelo' : partnerSiteName,
                value: calculatedValue,
                totalPointsAmount: calculatedValue * multiplier,
                bonusCia: (1 + (bonusCia?.replace('%', '') / 100)) || 1,
                priceForAThousand,
                id: crypto.randomUUID()
            }])
        } else {
            setResultByCategory(prev => [...prev, {
                categoryId: selectedCategory.id,
                partnerSiteName: selectedCategory.id == 2 ? 'Shopping Livelo' : partnerSiteName,
                value: calculatedValue,
                totalPointsAmount: calculatedValue * multiplier,
                bonusCia: (1 + (bonusCia?.replace('%', '') / 100)) || 1,
                priceForAThousand,
                id: crypto.randomUUID()
            }])
        }
    }

    useEffect(() => {
        fetch(url)
            .then((res) => res.json())
            .then((data) => {
                const dolar = Number(data["USDBRL"].bid)
                setDolarValue(dolar)
            })
            .catch((err) => console.log('Erro ao buscar dólar:', err))
    }, [url])

    useEffect(() => {
        if (value && multiplier && dolarValue) {
            handleResult()
        }
    }, [isReal, dolarValue])

    useEffect(() => {
        console.log('resultByCategory atualizado:', resultByCategory)
    }, [resultByCategory])

    return (
        <div className="flex flex-col gap-2 border border-slate-300 rounded-md p-4 shadow-lg">
            <div className='flex justify-end cursor-pointer' onClick={() => onRemove(selectedCategory.id)}>
                    <IoMdClose />
                </div>
            <div className='flex flex-col gap-4 flex-1 '>
                
                {fullObjectCategory?.id == 1 ? (
                    <div className='flex flex-col justify-between'>
                        <label htmlFor="partnerSiteName">Qual o nome do Site Parceiro?</label>
                        <input
                            id="partnerSiteName"
                            type="text"
                            className="border border-slate-300 rounded-md p-2"
                            value={partnerSiteName}
                            onChange={(e) => setPartnerSiteName(e.target.value)}
                            onBlur={handleResult}
                        />
                    </div>
                ) : fullObjectCategory?.id == 2 ? (
                    <div className='flex gap-2 justify-center items-center pb-4'>
                        <h3 className='font-bold text-xl text-center'>Shopping Livelo</h3>
                    </div>
                ) : (
                    <div className='flex flex-col justify-between'>
                        <label htmlFor="partnerSiteName">Nome do Site?</label>
                        <input
                            id="partnerSiteName"
                            type="text"
                            className="border border-slate-300 rounded-md p-2"
                            value={partnerSiteName}
                            onChange={(e) => setPartnerSiteName(e.target.value)}
                            onBlur={handleResult}
                        />
                    </div>
                )}

                <div className='flex flex-col justify-between'>
                    <label htmlFor='productValue'>Qual o valor do produto?</label>
                    <input
                        id="productValue"
                        type="number"
                        className="border border-slate-300 rounded-md p-2"
                        value={value}
                        onChange={(e) => setValue(Number(e.target.value))}
                        onBlur={handleResult}
                    />
                </div>
                {fullObjectCategory?.id != 3 && (
                    <div className='flex flex-col justify-between'>
                        
                        <label className='flex items-center gap-2'>
                            <span>Dolar</span>
                            <input 
                                type='checkbox' 
                                checked={isReal} 
                                className='toggle' 
                                onChange={() => {
                                    setIsReal(!isReal)
                                }} 
                            />
                            <span>Real</span>
                        </label>

                        <label htmlFor='multiplier'>Pontos por {isReal ? "R$" : "$"}?</label>
                        <input
                            id="multiplier"
                            type="number"
                            className="border border-slate-300 rounded-md p-2"
                            value={multiplier}
                            onChange={(e) => setMultiplier(Number(e.target.value))}
                            onBlur={handleResult}
                        />
                        <label htmlFor='bonusCia'>Bonus Companhia Aerea</label>
                        <input
                            id="bonusCia"
                            type="text"
                            className="border border-slate-300 rounded-md p-2"
                            value={bonusCia}
                            onChange={(e) => setBonusCia(e.target.value)}
                            onBlur={handleResult}
                        />

                        <label htmlFor='priceForAThousand'>Valor Milheiro CIA</label>
                        <input
                            id="priceForAThousand"
                            type="number"
                            className="border border-slate-300 rounded-md p-2"
                            onChange={(e) => setPriceForAThousand(Number(e.target.value))}
                            onBlur={handleResult}
                        />
                    </div>
                )}
            </div>
        </div>
    )
}
