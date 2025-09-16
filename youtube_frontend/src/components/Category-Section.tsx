import { useState } from "react"
import CategoryButton from "./ui/Category-Button"
const CategorySection = () => {
     const [category, setCategory] = useState([
          { id:1, name: 'All', to: "/", isActive: true },
          { id:2, name: 'Music', to: "/", isActive: false },
          { id:3, name: 'News', to: "/", isActive: false },
          { id:4, name: 'Chill out-music', to: "/", isActive: false },
          { id:5, name: 'Gaming', to: "/", isActive: false },
          { id:6, name: 'Live', to: "/", isActive: false },
          { id:7, name: 'Meditation music', to: "/", isActive: false },
          { id:8, name: 'Inventions', to: "/", isActive: false },
          { id:9, name: 'Comedy', to: "/", isActive: false },
     ])

     const handleClick = (id: number ) => {
          const v = category.map((el) => el.id == id ? { ...el, isActive: true } : {...el , isActive:false})
          setCategory(v)
     }
     
     return (
          <div className="flex items-center gap-2">
               {
                    category.map((item) => {
                         return (
                              < CategoryButton to={item.to} id={item.id} key={item.to} children={item.name} onclick={handleClick} isActive={item.isActive} />
                         )
                    })
               }
          </div>
     )
}

export default CategorySection