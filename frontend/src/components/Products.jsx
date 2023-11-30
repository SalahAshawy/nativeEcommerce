import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function Products() {

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);


    useEffect(() => {
        axios.get('http://localhost/scandiweb/api.php').then(response => {
            setProducts(response.data);
            setLoading(false);
        }).catch(error => {
            console.error(error);
        })

    }, []);
    products['select'] = false;
    const delId = () => {
        let arrIds = [];
        products.map((element) => {
            if (element.select) {
                arrIds.push(element['sku']);
                
            }


        });
        //delete requist 
        const id ={sku:arrIds}
       
        console.log(id);
        axios.post(`http://localhost:80/scandiweb/api.php`,id).then(function(response){
            window.location.reload();
            // console.log(response.data.massage);
           }).catch(function(error){
             console.log('error',error);
          });
    }

    const ShowProducts = () => {
        return (
            <>
                {products.map((product) => {
                    return (

                        <div className="col-md-3 mb-4 mt-4">
                            <div className="card h-100 text-center p-4" key={product.sku}>
                            {product.sku}
                                <div className="card-body">
                                    <h5 className="card-title mb-0">{product.name}</h5>
                                    <p className="card-text lead fw-bold">${product.price}</p>
                                    <p className="card-text lead fw-bold">{product.type==="Book"? ` weight: ${product.weight}`: product.type==="Furniture" ? `Dimensions: ${product.height},${product.length},${product.width}`: product.type==="DVD" ? ` size :${product.size}`:""}</p>
                                    <input type="checkbox" value={product.sku} name={product.sku} className='delete-checkbox' onChange={(e) => {
                                        product.select = e.target.checked;

                                    }} />



                                </div>
                            </div>
                        </div>

                    );


                })}

            </>
        )
    };
    return (
        <div>
            <div className='col-3 mb-0 '>
                <h2 class="row justify-content-center text-dark">products</h2>
            </div>
            <div className='container d-flex justify-content-end'>
                <Link to='add-product' className="btn btn-outline-dark my-2">ADD</Link>
                <button to='add-product' className="btn btn-outline-dark my-2" onClick={() => { delId() }} >Mass Delete</button>

            </div>



            <hr />
            <div className="row">
                {<ShowProducts />}
            </div>
        </div>


    );
}

export default Products;
