import CATEGORIES from "./utils"


export const NewSectionModal = ({setSelectedCategory, selectedCategory, onClose, setIsProductModalOpen, numberOfProductSections, resultByCategory}) => {
  
    return (
    <div className='flex flex-col gap-2 border border-slate-300 rounded-md p-4'>
        <h1>Escolha a categoria da sessão</h1>
        <select 
            className='select' 
            value={selectedCategory || ""}
            onChange={(e) => {
            setSelectedCategory(prev => [...prev, {
                id: numberOfProductSections,
                category: e.target.value
            }])
            onClose()
            setIsProductModalOpen(true)
        }}> 
            <option disabled value="">Escolha uma categoria</option>
            {CATEGORIES.map((e) => (
                <option key={e.id} value={e.id}>{e.name}</option>
            ))}
        </select>
    </div>
  )
}
