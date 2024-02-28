import React, { useEffect, useState } from "react";
import Main from "./components/Main";
import Footer from "./components/Footer";
import { Routes, Route, useLocation } from "react-router-dom";
import Promotion from "./pages/Promotion";
import GetShotDetails from "./pages/GetShotDetails";
import GetShotDetailsId from "./pages/GetShotDetailsId";
import ToHelpPage from "./pages/ToHelpPage";
import Settings from "./pages/Settings";
import PersonalArea from "./pages/PersonalArea";
import Project from "./pages/Project";
import MyInformation from "./pages/MyInformation";
import "react-toastify/dist/ReactToastify.css";
import { AlertData } from "./UI/Alert/Alert";
import AllProject from "./pages/AllProject";
import { useNavigate } from "react-router";
import AboutApplication from "./pages/AboutApplication";
import { PiAppStoreLogoBold } from "react-icons/pi";
import { FaGooglePlay } from "react-icons/fa";
import { FaCloudArrowDown } from "react-icons/fa6";
import axios from "axios";
import { url } from "./Api";
import Notifications from "./pages/Notifications";
import NotificationsDetail from "./pages/NotificationsDetail";
import QrCode from "./pages/QrCode";
import Locations from "./pages/Locations";
import PriceAddress from "./pages/PriceAddress";
import Modal from "./UI/Modal/Modal";
import HarryBuyDeatils from "./pages/HarryBuyDeatils";
import HarryBuyDetailsId from "./pages/HarryBuyDetailsId";
import FeaturedProducts from "./pages/FeaturedProducts";
import PurchaseHistory from "./pages/PurchaseHistory";
import BasketProduct from "./pages/BasketProduct";
import DeliveryAddress from "./pages/DeliveryAddress";
import NewAddress from "./pages/NewAddress";
import PlacingOrders from "./pages/PlacingOrders";

const App = () => {
  const [openAlert, setOpenAlert] = useState({
    open: false,
    props: "",
    text: "",
  });

  const [user, setUser] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();
  const [version, setVersion] = useState([]);
  const [upDate, setUpDate] = useState(false);
  const [local, setLocal] = useState(localStorage.getItem("tokens"));
  const [modal, setModal] = useState(false);
  const [success, setSuccess] = useState(false);

  const headers = {
    Authorization: `Token ${local}`,
  };
  const handleScroll = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    handleScroll();
  }, [location]);

  function FuncAlert(text, props) {
    setTimeout(() => {
      setOpenAlert({
        ...openAlert,
        open: true,
        text: text,
        props: props,
      });
    }, 200);
    setOpenAlert({ ...openAlert, open: false });
  }

  useEffect(() => {
    if (openAlert.open) {
      const timeoutId = setTimeout(() => {
        setOpenAlert({ ...openAlert, open: false });
      }, 3000);

      return () => {
        clearTimeout(timeoutId);
      };
    }
  }, [openAlert.open]);

  const token = localStorage.getItem("token");
  useEffect(() => {
    if (!token) {
      navigate("/personal/to-come-in");
    }
  }, [token]);

  useEffect(() => {
    axios
      .get(url + "/versions")
      .then((response) => {
        setVersion(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const versionConst = "1.0.9";

  useEffect(() => {
    if (
      version &&
      version.version &&
      String(versionConst).replaceAll(".", "") <
        String(version.version).replaceAll(".", "")
    ) {
      setUpDate(true);
    }
  }, [version]);

  return (
    <>
      {openAlert.open && (
        <AlertData
          state={openAlert}
          setState={setOpenAlert}
          propsData={openAlert.props}
          text={openAlert.text}
        />
      )}
      {upDate && (
        <div className="verson">
          <div className="verson_block">
            <FaCloudArrowDown color="var(--orange)" size={75} />
            <h1>Доступно обновление</h1>
            <a href={version.appstore} target="blank" className="dowload app">
              <button className="button_form">
                <PiAppStoreLogoBold size={20} />
                Обновить
              </button>
            </a>
            <a
              href={version.googleplay}
              target="blank"
              className="dowload play"
            >
              <button className="button_form">
                <FaGooglePlay size={20} />
                Обновить
              </button>
            </a>
            <p onClick={() => setUpDate(false)} className="up_date">
              Обновить позже
            </p>
          </div>
        </div>
      )}
      {token ? (
        <div>
          <div>
            {modal && <Modal setModal={setModal}></Modal>}
            <Routes>
              <Route
                path="/"
                element={
                  <Main modal={success} setModal={setSuccess} user={user} />
                }
              />
              <Route path="promotion" element={<Promotion />} />
              <Route path="/get-shot-details" element={<GetShotDetails />} />
              <Route path="/harry" element={<HarryBuyDeatils />} />
              <Route
                path="/get-shot-details-id/:id"
                element={<GetShotDetailsId />}
              />
              <Route
                path="/harry-buy-details-id/:id"
                element={<HarryBuyDetailsId />}
              />
              <Route path="/to-help-page" element={<ToHelpPage />} />
              <Route
                path="/settings"
                element={<Settings Alert={FuncAlert} />}
              />
              <Route path="/dashboard" element={<PersonalArea />} />
              <Route
                path="shop-all/*"
                element={<Project Alert={FuncAlert} />}
              />
              <Route path="/application" element={<AboutApplication />} />
              <Route
                path="/my-information"
                element={<MyInformation Alert={FuncAlert} />}
              />
              <Route path="/notifications" element={<Notifications />} />
              <Route
                path="/notifications-details/:id"
                element={<NotificationsDetail />}
              />
              <Route path="/qr-code" element={<QrCode />} />
              <Route path="/locations" element={<Locations />} />
              <Route path="/price-address" element={<PriceAddress />} />
              <Route path="/purchase-history" element={<PurchaseHistory />} />
              <Route path="/basket-product" element={<BasketProduct />} />
              <Route path="/delivery-address" element={<DeliveryAddress />} />
              <Route path="/new-address" element={<NewAddress />} />
              <Route path="/placing-orders" element={<PlacingOrders />} />
            </Routes>
            <Footer />
          </div>
        </div>
      ) : (
        <div>
          <Routes>
            <Route
              path="personal/*"
              element={<AllProject setSuccess={setSuccess} Alert={FuncAlert} />}
            />
          </Routes>
        </div>
      )}
    </>
  );
};

export default App;
