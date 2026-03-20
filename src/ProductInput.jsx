import { useEffect, useMemo, useState } from 'react'
import { CATEGORIES, AIRLINE_CPM } from "./utils"
import clsx from 'clsx'


export const ProductInput = ({ selectedCategory, setResultByCategory, resultByCategory }) => {

    const [categoryId, setCategoryId] = useState(selectedCategory.category)
    const [value, setValue] = useState(null)
    const [multiplier, setMultiplier] = useState(null)
    const [partnerSiteName, setPartnerSiteName] = useState("")
    const [isNameConfirmed, setIsNameConfirmed] = useState(false)
    const [isReal, setIsReal] = useState(true)
    const [dolarValue, setDolarValue] = useState(null)
    const [bonusCia, setBonusCia] = useState(null)
    const [priceForAThousand, setPriceForAThousand] = useState(null)

    const conversionUrl = import.meta.env.VITE_AWESOMEAPI_URL
    const conversionToken = import.meta.env.VITE_AWESOMEAPI_TOKEN
    
    const url = conversionToken
        ? `${conversionUrl}/USD-BRL?token=${conversionToken}`
        : `${conversionUrl}/USD-BRL`

    const fullObjectCategory = useMemo(() => {
        return CATEGORIES.find((e) => e.id == categoryId)
    }, [categoryId])

    const handleNameConfirm = () => {
        if (partnerSiteName.trim()) {
            setIsNameConfirmed(true)
        }
    }
    const shouldShowFullForm = fullObjectCategory?.id == 2 || isNameConfirmed

    const handleResult = () => { 
        if (!value || value === 0) {

            const filtered = resultByCategory.filter((e) => e.categoryId != selectedCategory.id)
            setResultByCategory(filtered)
            return
        }

        if (fullObjectCategory?.id != 3 && (!multiplier || multiplier === 0)) {
            const filtered = resultByCategory.filter((e) => e.categoryId != selectedCategory.id)
            setResultByCategory(filtered)
            return
        }

        if (!isReal && (!dolarValue || dolarValue === 0)) {
            console.log('Aguardando valor do dólar...')
            return
        }

        const alreadyExists = resultByCategory.find((e) => e.categoryId == selectedCategory.id)
        const calculatedValue = isReal ? value : value / dolarValue

        const resultData = {
            categoryId: selectedCategory.id,
            partnerSiteName: fullObjectCategory?.id == 2 ? 'Shopping Livelo' : partnerSiteName,
            value: isReal ? calculatedValue : value,
            totalPointsAmount: calculatedValue * (multiplier || 1),
            bonusCia: (1 + (bonusCia?.replace('%', '') / 100)) || 1,
            priceForAThousand,
            id: crypto.randomUUID()
        }

        if (alreadyExists) {
            const filtered = resultByCategory.filter((e) => e.categoryId != selectedCategory.id)
            setResultByCategory([...filtered, resultData])
        } else {
            setResultByCategory(prev => [...prev, resultData])
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
        handleResult()
    }, [value, multiplier, isReal, dolarValue, bonusCia, priceForAThousand, categoryId, partnerSiteName])

    return (
        <div className="flex flex-col bg-gray-800 border border-gray-700 rounded-lg p-4 shadow-xl">
            {!shouldShowFullForm ? (
                <div className='flex flex-col gap-2'>
                    <label htmlFor="partnerSiteName" className="title-text">
                        {fullObjectCategory?.id == 1 ? "Site Parceiro" : "Loja sem parceria"}
                    </label>
                    <input
                        id="partnerSiteName"
                        type="text"
                        className="input-fields mt-3"
                        value={partnerSiteName}
                        placeholder='Amazon'
                        onChange={(e) => setPartnerSiteName(e.target.value)}
                        onBlur={handleNameConfirm}
                    />
                </div>
            ) : (
                <div className='flex flex-col gap-4 h-full'>
                    <div>
                        <div>
                            <h3 className='title-text'>
                                {fullObjectCategory?.id == 2 ? 'Livelo' : partnerSiteName}
                            </h3>
                        </div>

                        <div className='flex flex-col justify-between'>
                            <label htmlFor='productValue' className="title-text">Valor do produto</label>
                            <input
                                id="productValue"
                                type="number"
                                className="input-fields"
                                value={value || ""}
                                onChange={(e) => setValue(e.target.value ? Number(e.target.value) : null)}
                            />
                        </div>
                    </div>

                    {fullObjectCategory?.id == 3 && (
                        <div className='h-full flex flex-col'>

                            <div className='rounded bg-gray-700/25 flex h-[20%] items-center justify-center shadow-xl p-2'>
                                <p className='text-gray-400 text-xs'>Essa opção nao gera pontos/milhas  </p>
                            </div>
                        </div>
                    )}

                    <div className={clsx('border-t border-gray-700', {
                        'hidden': fullObjectCategory?.id == 3
                    })}>
                        {fullObjectCategory?.id != 3 && (
                            <div className='flex flex-col justify-between gap-3'>
                                
                                <div className='flex flex-col mt-4'>
                                    <label className='flex items-center gap-2 text-gray-300 '>
                                        <span className='title-text'>Dolar</span>
                                        <input 
                                            type='checkbox' 
                                            checked={isReal} 
                                            className='toggle toggle-xs toggle-primary' 
                                            onChange={() => {
                                                setIsReal(!isReal)
                                            }} 
                                        />
                                        <span className='title-text'>Real</span>
                                    </label>
                                </div>
                                
                                <div className='flex flex-col'>
                                    <label htmlFor='multiplier' className="title-text">Pontos por {isReal ? "R$" : "$"}?</label>
                                    <input
                                        id="multiplier"
                                        type="number"
                                        className="input-fields"
                                        value={multiplier || ""}
                                        onChange={(e) => setMultiplier(e.target.value ? Number(e.target.value) : null)}
                                    />
                                </div>

                                <div className='flex flex-col'>
                                    <label htmlFor='bonusCia' className="title-text">Bonus na transferência (%)</label>
                                    <input
                                        id="bonusCia"
                                        type="text"
                                        className="input-fields"
                                        value={bonusCia || ""}
                                        onChange={(e) => setBonusCia(e.target.value)}
                                    />
                                </div>

                                <div className='flex flex-col'>
                                    <label htmlFor='priceForAThousand' className="title-text">Transferir para</label>
                                    
                                    <select 
                                        id='priceForAThousand'
                                        className='input-fields'
                                        value={priceForAThousand || ""}
                                        onChange={(e) => setPriceForAThousand(e.target.value ? Number(e.target.value) : null)}
                                    >
                                        <option>Selecione</option>
                                        {AIRLINE_CPM.map((option) => (
                                            <option key={option.id} value={option.value}>
                                                {option.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    )
}
