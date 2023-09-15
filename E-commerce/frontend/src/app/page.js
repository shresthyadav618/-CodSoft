
import { connect } from "@/dbConfig/dbConfig";
import { productModel } from "@/models/productsModel";
import Featured from "../../components/featured";
import Header from "../../components/header";
import NewProducts from "../../components/newProducts";
export default async function page() {
  const featuredProductId = '64f3951a6f4dc08d1aa20c3f';
  await connect();
  const featuredProduct = await productModel.findById(featuredProductId);
  const newProducts = await productModel.find({},null,{sort : {'updatedAt':-1} , limit:8});
  console.log('THE VALUE OF PRODUCTS AREds **** ',featuredProduct);
  console.log('THE VALUE OF NEW PRODUCTS  ',newProducts);
  return (
   
    <div>
      <Header/>
      <Featured product={featuredProduct}/>
      <NewProducts products={newProducts} />
    </div>
    
  )
}
