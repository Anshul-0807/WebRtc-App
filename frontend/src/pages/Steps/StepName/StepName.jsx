import React, { useState } from "react";
import Card from "../../../component/shared/Card/Card";
import Button from "../../../component/shared/Button/Button";
import TextInput from "../../../component/shared/TextInput/TextInput";
import { useDispatch, useSelector } from "react-redux";
import { setName } from "../../../store/activateSlice";
import styles from "./StepName.module.css";

const StepName = ({ onNext }) => {
  const { name } = useSelector((state) => state.activate);
  const dispatch = useDispatch();
  const [fullname, setFullname] = useState(name);

  function nextStep() { 
    if (!fullname) {
      return;
    }

    dispatch(setName(fullname));
    onNext();
  }

  return (
    <>
      <Card title="What’s your full name ?" icon="goggle">
        <TextInput
          value={fullname}
          onChange={(e) => setFullname(e.target.value)}
        />

        <div>
          <p className={styles.paragraph}>
            People use real name at coderhouse :) !
          </p>
          <div>
            <Button onClick={nextStep} text="Next" />
          </div>
        </div>
      </Card>
    </>
  );
};
export default StepName;
