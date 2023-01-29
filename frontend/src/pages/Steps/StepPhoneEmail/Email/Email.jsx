import React, { useState } from "react";
import Card from "../../../../component/shared/Card/Card";
import Button from "../../../../component/shared/Button/Button";
import TextInput from "../../../../component/shared/TextInput/TextInput";
import styles from "../StepPhoneEmail.module.css";

export const Email = ({ onNext }) => {
  const [email, setemail] = useState("");

  return (
    <Card title="Enter your email id" icon="mailing">
      <TextInput value={email} onChange={(e) => setemail(e.target.value)} />

      <div>
        <div className={styles.actionButtonWrap}>
          <Button text="Next" onClick={onNext} />
        </div>
        <p className={styles.BottomParagraph}>
          By entering your number. you're agreeing to our terms of service and
          private policy. Thanks.
        </p>
      </div>
    </Card>
  );
};
export default Email;
