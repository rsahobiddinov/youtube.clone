import CategorySection from "../components/Category-Section"
import Showcase from '../components/Showcase'
const HomePage = () => {
     return (
          <>
               <main className="category-section w-full h-[40px]">
                    <CategorySection />
               </main>

               <main className="showcase pr-2">
                    <Showcase />
               </main>
          </>
     )
}

export default HomePage