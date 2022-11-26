import "./product.css";
import { NavLink, useLocation } from "react-router-dom";
import Chart from "../../components/chart/Chart";
import { Publish } from "@mui/icons-material";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useMemo, useState } from "react";
import { userRequest } from "../../requestMethods";
import { updateProduct } from "../../redux/apiCalls";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "../../firebase";

function Product() {
  const location = useLocation();
  const productId = location.pathname.split("/")[2];

  const [pStats, setPStats] = useState([]);

  const [inputs, setInputs] = useState({});
  const [file, setFile] = useState(null);
  const [cat, setCat] = useState([]);
  const [size, setSize] = useState([]);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleCat = (e) => {
    setCat(e.target.value.split(","));
  };

  const handleSize = (e) => {
    setSize(e.target.value.split(","));
  };

  const product = useSelector((state) =>
    state.product.products.find((product) => product._id === productId)
  );

  // Update Prodcut API
  const handleUpdateClick = (e) => {
    e.preventDefault();
    const fileName = new Date().getTime() + file.name;
    const storage = getStorage(app);
    const storageRef = ref(storage, fileName);

    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
          default:
        }
      },
      (error) => {
        console.log(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log("File available at", {
            ...inputs,
            img: downloadURL,
            categories: cat,
            size: size,
            productId,
          });
          const product = {
            ...inputs,
            img: downloadURL,
            categories: cat,
            size: size,
            productId,
          };
          updateProduct(dispatch, productId, product);
        });
      }
    );
  };

  const MONTHS = useMemo(
    () => [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Agu",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    []
  );

  useEffect(() => {
    const getStats = async () => {
      try {
        const res = await userRequest.get("orders/income?pid=" + productId);
        const list = res.data.sort((a, b) => {
          return a._id - b._id;
        });
        list.map((item) =>
          setPStats((prev) => [
            ...prev,
            { name: MONTHS[item._id - 1], Sales: item.total },
          ])
        );
      } catch (err) {
        console.log(err);
      }
    };
    getStats();
  }, [productId, MONTHS]);

  return (
    <div className="product">
      <div className="productTitleContainer">
        <h1 className="productTitle">Product</h1>
        <NavLink to="/newproduct">
          <button className="productAddButton">Create</button>
        </NavLink>
      </div>

      <div className="productTop">
        <div className="productTopLeft">
          <Chart
            data={{ pStats }}
            dataKey="Sales"
            title="Sales Performance"
            grid
          />
        </div>

        <div className="productTopRigth">
          <div className="producrInfoTop">
            <img className="productInfoImg" src={product.img} alt="Error" />
            <span className="productName">{product.title}</span>
          </div>
          <div className="producrInfoBottom">
            <div className="producrInfoItem">
              <span className="productInfoKey">id:</span>
              <span className="productInfoValue">{product._id}</span>
            </div>
            <div className="producrInfoItem">
              <span className="productInfoKey">in stock</span>
              <span className="productInfoValue">{product.inStock}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="productBottom">
        <form className="productForm">
          <div className="productFormLeft">
            <label>Title</label>
            <input
              name="title"
              onChange={handleChange}
              type="text"
              placeholder={product.title}
            />
            <label>Description</label>
            <input
              name="desc"
              onChange={handleChange}
              type="text"
              placeholder={product.desc}
            />
            <label>Price</label>
            <input
              name="price"
              onChange={handleChange}
              type="number"
              placeholder={product.price}
            />
            <label>Categories</label>
            <input
              onChange={handleCat}
              type="array"
              placeholder={product.categories}
            />
            <label>Size</label>
            <input
              name="size"
              onChange={handleSize}
              type="array"
              placeholder={product.size}
            />

            <label>Color</label>
            <input
              name="color"
              onChange={handleChange}
              type="text"
              placeholder={product.color}
            />
            <label>In Stock</label>
            <select name="inStock" onChange={handleChange}>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </div>
          <div className="productFormRight">
            <div className="productUpload">
              <img src={product.img} alt="Error" className="productUploadImg" />
              <label for="file">
                <Publish />
              </label>
              <input
                type="file"
                id="file"
                onChange={(e) => setFile(e.target.files[0])}
                hidden
              />
            </div>
            <button onClick={handleUpdateClick} className="productButton">
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Product;
