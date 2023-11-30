import React, { useState } from 'react';
import {Link,useNavigate} from 'react-router-dom';
import axios from 'axios';


function AddProduct() {
  const [SelectValue, setSelectValue] = useState();
  const [skuValue, setSkuValue] = useState();
  const [nameValue, setNameValue] = useState();
  const [hightValue, setHightValue] = useState();
  const [widthtValue, setWidthValue] = useState();
  const [lengthValue, setLengthValue] = useState();
  const [weightValue, setWeightValue] = useState();
  const [sizeValue, setSizeValue] = useState();
  const [priceValue, setPriceValue] = useState();
  const [error, setError] = useState();
  const navigate = useNavigate();
  const pureNumberRegex=/^\d+$/;
  
 
  // adding new product request handle

  const saveProduct = () => {
    
    const data = {
      sku: skuValue,
      name: nameValue,
      price: priceValue,
      type: SelectValue,
      weight: weightValue,
      width: widthtValue,
      height: hightValue,
      length: lengthValue,
      size: sizeValue
    }
    setError('');
    if (!skuValue || !nameValue ) {
      setError('Please Enter the required data !');
      return;
    }
    if (SelectValue === "book") {
      if (!weightValue) {
        setError('Please Enter the required data !');
        return;
      }
    }
    if (SelectValue === "dvd") {
      if (!sizeValue) {
        setError('Please Enter the required data !');
        return;
      }
    }
    if (SelectValue === "furniture") {
      if (!lengthValue || !hightValue || !widthtValue) {
        setError('Please Enter the required data !');
       return;
      }
    }
    if (!pureNumberRegex.test(priceValue)) {
      setError("Please provide the data  of indicated type");
      return;
    }
    if(lengthValue<=0||widthtValue<=0||hightValue<=0){
      alert("Plese Enter Provid Dimensions ");
      return;
    }
     if(weightValue<=0){
      alert("Plese Enter Provid weight ");
      return;
    }
    if(sizeValue<=0){
      alert("Plese Enter Provid size ");
      return;
    }
    if(priceValue<=0){
      alert("Plese Enter Provid Price ");
      return;
    }
    setError('');
    axios.post('http://localhost:80/scandiweb/api.php', data).then(function (response) {
      if (!response.data.message)
        alert('SKU is already exist')
      else navigate('/');
      // console.log(response.data.message);
    }).catch(function (error) {
      // console.log('error',error);
    });
  };


  //Change input fields handle
  const handleChange = (event) => {
    const { name, value } = event.target;
    if (error) setError('');
    switch (name) {
      case 'sku':
        setSkuValue(value);
        break;
      case 'name':
        setNameValue(value);
        break;
      case 'price':
        setPriceValue(value);
        break;
      case 'weight':
        setWeightValue(value);
        break;
      case 'hight':
        setHightValue(value);
        break;
      case 'width':
        setWidthValue(value);
        break;
      case 'length':
        setLengthValue(value);
        break;
      case 'size':
        setSizeValue(value);
        break;
    }
  }


  // Dynamically chang the form function
  const ExtraDetailsForm = () => {
    if (SelectValue === 'furniture') {
      return (
        <div className="form-group">
          <label className="mb-1  text-info" >pleas provide the Hight ,Widt and Length in HxWxLx format</label>
          <br />
          <label className="mb-1" for="Hight">Hight</label>

          <input type="number" className="form-control mb-1" id="hight" value={hightValue} name="hight" onChange={(e) => setHightValue(e.target.value)} />
          <div className="mb-1 ml-2 text-danger">{hightValue ? "" : error}</div>

          <label className="mb-1" for="Width">Width</label>
          <input type="number" className="form-control mb-1" id="width" name='width' onChange={handleChange} />
          <div className="mb-1 ml-2 text-danger">{widthtValue ? "" : error}</div>

          <label className="mb-1" for="Length">Length</label>
          <input type="number" class="form-control mb-1" id="length" name='length' onChange={handleChange} />
          <div className="mb-1 ml-2 text-danger">{lengthValue ? "" : error}</div>
        </div>
      );
    }
    else if (SelectValue === 'book') {
      return (
        <div class="form-group">
          <label className="mb-1 text-info">pleas provide the Weight in KG</label>
          <br />
          <label className="mb-1" for="Weight">Weight</label>
          <input type="number" className="form-control mb-1" id="Weight" name='weight' onChange={handleChange} />
          <div className="mb-1 ml-2 text-danger">{weightValue ?  "" : error}</div>
        </div>
      );
    }
    else if (SelectValue === 'dvd') {
      return (
        <>
          <label className="mb-1  text-info">pleas provide the Size in MB</label>
          <br />
          <label className="mb-1" for="Size">Size</label>
          <input type="number" className="form-control mb-1 mb-1" id="Size" name='size' onChange={handleChange} />
          <div className="mb-1 ml-2 text-danger">{sizeValue ? "" : error}</div>
        </>
      );


    }
  }
  return (
    <>
      <div className="'container d-flex justify-content-center mb-4 mt-2">
        <buuton className="btn btn-outline-dark" onClick={saveProduct}>Save</buuton>
        <div className="col-md-8" ></div>
        <Link to='/' className="btn btn-outline-dark" >Cancel</Link>
      </div>
      <div className="container">
        <form>

          <div class="form-group">
            <label className="mb-1" for="SKU">SKU</label>
            <input type="text" className="form-control mb-1 mb-1" id="SKU" name='sku' onChange={handleChange} />
            <div className="mb-1 ml-2 text-danger">{skuValue ? "" : error}</div>

            <label className="mb-1 mt-1" for="Name">Name</label>
            <input type="text" className="form-control mb-1 mb-1" id="Name" name='name' onChange={handleChange} />
            <div className="mb-1 ml-2 text-danger">{nameValue ? "" : error}</div>

            <label className="mb-1" for="price">Price</label>
            <input type="number" class="form-control mb-1 mb-1" id="price" name='price' onChange={handleChange} />
            <div className="mb-1 ml-2 text-danger">{priceValue ? "" : error }</div>

          </div>
          <div class="form-group">
            <select class="form-control mb-1 mb-1" id="productType" onChange={(e) => { setSelectValue(e.target.value) }}>
              <option id="Type Switcher" >Type Switcher</option>
              <option id="book">book</option>
              <option id="dvd">dvd</option>
              <option id="furniture">furniture</option>

            </select>
            <div className="mb-1 ml-2 text-danger">{SelectValue !== "..." ? "" : error}</div>
          </div>
          {ExtraDetailsForm()}

        </form>
      </div>
    </>
  );
};

export default AddProduct;