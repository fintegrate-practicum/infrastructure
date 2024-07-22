import './App.css';
import AddProductForm from './components/AddProductForm';
import { Route, Routes } from 'react-router-dom';

// import ShowProducts from './components/showProducts/AllProducts';
function Inventory() {
  return (
    <>
      <h1>Inventory</h1>
      <Routes>
        <Route path="ii" element={<AddProductForm />} />
      </Routes>

    </>
  );
}
export default Inventory




// import './App.css';
// import AddProductForm from './components/AddProductForm';
// import { route, routes } from 'react-router-dom';

// // ייבוא ​​ShowProducts מ-'./components/showProducts/AllProducts';
// function Inventory() {
//   Return(
//     <>
//       <  h1  > inventory </  h1  >
//       <  h1  > Navigate to me to see the add code form </  h1  >
//       <  routes  >
//         {/* <  path path="ii" element={<  AddProductForm product={
//           "id" : "6693958b438c19b25cdeab38",
//           Product name​​  
//         "Product description": "It's one "  
//         "componentsImages": [
//             "1",
//             "2"
//           ],
//           "Package cost": 100,
//           "Product components": [
//             "12131"
//           ],
//           "Final price": 4040,
//           "adminId": "1234567",
//           "He is active": true,
//           "isOnSale": true,
//           "SalePercentage": 50,
//           "stockQuantity": 2483,
//           "bussinesId": "987f65",
//           "componentStatus": "gvfvgewiuf"
//        } />} /> */}
//       </  routes  >

//     </>
//   );
// }
//   Default stock will  be exported