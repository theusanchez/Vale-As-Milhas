import { useState } from "react";
import { ProductInput } from "./ProductInput";
import { ResultModal } from "./ResultModal";
import { CATEGORIES } from "./utils";


function App() {

    const [selectedCategory, setSelectedCategory] = useState([
        { id: 1, category: "1" },
        { id: 2, category: "2" },
        { id: 3, category: "3" }
    ])
    const [resultByCategory, setResultByCategory] = useState([])
    const [isResultModalOpen, setIsResultModalOpen] = useState(false)

    return (
        <section className="flex flex-col items-center gap-4 p-4 bg-gray-900 min-h-screen">
            <div className="flex flex-col items-center justify-center gap-4">
                <h1 className="text-4xl font-bold text-white">
                    Vale as <span className="text-purple-500">Milhas?</span>
                </h1>
                <p className="text-lg text-gray-300">
                    Descubra se vale a pena comprar pelo site parceiro para gerar milhas
                </p>
            </div>

            <div className="flex flex-row flex-wrap justify-center gap-4 w-full max-w-6xl">
                {selectedCategory.map((category) => (
                    <ProductInput 
                        key={category.id}
                        selectedCategory={category}
                        setResultByCategory={setResultByCategory}
                        resultByCategory={resultByCategory}
                        allCategories={CATEGORIES}
                    />
                ))}
            </div>

            <div>
                <button 
                    disabled={resultByCategory.length < 2} 
                    className="px-6 py-3 bg-purple-600 hover:bg-purple-700 disabled:bg-gray-700 disabled:text-gray-500 text-white font-semibold rounded-lg transition-colors" 
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
