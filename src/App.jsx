import { useEffect, useState } from "react";
import { FaRegPlusSquare } from "react-icons/fa";
import { ProductInput } from "./ProductInput";
import { ResultModal } from "./ResultModal";
import { NewSectionModal } from "./NewSectionModal";


function App() {

    const [selectedCategory, setSelectedCategory] = useState([])
    const [numberOfProductSections, setNumberOfProductSections] = useState(0)
    const [resultByCategory, setResultByCategory] = useState([])
    const [isSectionModalOpen, setIsSectionModalOpen] = useState(false)
    const [isProductModalOpen, setIsProductModalOpen] = useState(false)
    const [isResultModalOpen, setIsResultModalOpen] = useState(false)

    const handleRemoveCategory = (categoryIdToRemove) => {
        setSelectedCategory(prev => 
            prev.filter(cat => cat.id !== categoryIdToRemove)
        )
        
        setResultByCategory(prev => 
            prev.filter(result => result.categoryId !== categoryIdToRemove)
        )
    }

    return (
        <section className="flex flex-col items-center gap-4 p-4 bg-base-200 h-screen">
            <div className="flex flex-col items-center justify-center gap-4">
                <h1 className="text-4xl font-bold ">
                    Vale as <span className="text-purple-600">Milhas?</span>
                </h1>
                <p className="text-lg ">
                    Descubra se vale a pena comprar pelo site parceiro para gerar milhas
                </p>
            </div>

            <div 
                className="flex flex-row justify-center gap-2 items-center btn btn-ghost border border-slate-300" 
                onClick={() => {
                    setNumberOfProductSections(prev => prev + 1)
                    setIsSectionModalOpen(true)
                }}>
                <FaRegPlusSquare className="text-2xl"  />
                <h3>Adicionar Nova Sessão</h3>
            </div>

            {isSectionModalOpen && 
                <NewSectionModal 
                    onClose={() => setIsSectionModalOpen(false)} 
                    setSelectedCategory={setSelectedCategory} 
                    setIsProductModalOpen={setIsProductModalOpen}
                    numberOfProductSections={numberOfProductSections}
                    resultByCategory={resultByCategory}
                />
            }

            <div className="flex flex-row justify-between gap-4">
                {isProductModalOpen && 
                    selectedCategory.map((category) => (
                        <ProductInput 
                            key={category.id}
                            selectedCategory={category}
                            onRemove={handleRemoveCategory}
                            setResultByCategory={setResultByCategory}
                            resultByCategory={resultByCategory}
                        />
                    ))
                }
            </div>

            <div>
                <button 
                    disabled= {numberOfProductSections < 2} 
                    className="btn btn-primary" 
                    onClick={() => setIsResultModalOpen(true)}>
                        Calcular
                </button>
            </div>

            <div>
                {isResultModalOpen && (
                    <ResultModal 
                        onClose={() => setIsResultModalOpen(false)}
                        resultByCategory={resultByCategory} 
                    />
                )}
            </div>

            
        </section>
    )
}

export default App
