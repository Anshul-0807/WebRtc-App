import React , { useEffect, useState }from "react";
import Card from "../../../component/shared/Card/Card";
import Button from "../../../component/shared/Button/Button";
import styles from './StepAvatar.module.css';
import { useSelector, useDispatch } from "react-redux";
import {setAvatar} from '../../../store/activateSlice';
import { activate } from "../../../http/index";
import { setAuth } from '../../../store/authSlice';
import { Loader } from "../../../component/shared/Loader/Loader";



export const StepAvatar = ({ onNext }) => {
  const dispatch = useDispatch();
  const { name, avatar } = useSelector((state) => state.activate);
  const [image, setImage] = useState('/Imags/anime2.png');
  const [loading, setLoading] = useState(false);
  const [unMounted, setUnMounted] = useState(false);
  function captureImage(e){
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = function () {
      setImage(reader.result);
      dispatch(setAvatar(reader.result));

    };


  }
  async function submit(){
    if(!name || !avatar) return;
    setLoading(true);
   try {
    const {data} = await activate( { name, avatar });
    if(data.auth){
      // check
      if(!unMounted){
       dispatch(setAuth(data));
      }
    }
    setLoading(false);
   } catch (err) {
    console.log(err);
   } finally {
    setLoading(false);
   }
  }

useEffect(() =>{
  return() =>{
    setUnMounted(true);
  }
}, []);

  if(loading) return <Loader message="Activation in progress...."/>;
  return (
    <>
      <Card title={`Okay, ${name}`} icon="monkey">
      <p className={styles.subHeading}>How's this photo?</p>
      <div className={styles.avatarWrapper}>
        <img className={styles.avatarImage}  src={image} alt="Avataaar" />
      </div>
      <div>
        <input
        onChange={captureImage}
         id="avatarInput" type="file" className={styles.avatarInput}/>
          <label className={styles.avatarLabel} htmlFor="avatarInput">
            choose a different photo
          </label> 
      </div>
        <div>
          <Button onClick={submit} text="Next" />
        </div>
      </Card>
    </>
  );
};
export default StepAvatar;
