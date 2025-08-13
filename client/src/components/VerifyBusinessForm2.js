import React, { useState } from "react";
import "../style/VerifyBusinessForm2.css";

export const VerifyBusinessForm2 = () => {

  const [businessDoc, setBusinessDoc] = useState(null);
  const [license, setLicense] = useState(null)
  const [idDoc, setIdDoc] = useState(null);
  const handleFileChange = (e, setter) => {
    setter(e.target.files[0]);
  };
  const handleSubmit = async () => {
alert(23)
  } 
  return (
    <div className="artboard-screen">
      <div className="artboard-2">
        <div className="overlap-5">
          <div className="rectangle-16" />

          <div className="group-19">
            <div className="overlap-6" >
              <div className="rectangle-17"  />

              <div className="rectangle-18"  />

              <div className="rectangle-19" />

              <div className="text-wrapper-42">אמת את העסק שלך</div>

              <div className="text-wrapper-43">הוסף עסק</div>

              <div className="text-wrapper-44">דואר אלקטרוני</div>

              <div className="text-wrapper-45">סיסמא</div>

              <div className="text-wrapper-46">תעודת זהות</div>

              <p className="text-wrapper-47">
                כדי לאשר שזהו העסק שלך, אנא מלא את הטופס למטה <br />
                מנהלי האתר שלנו יבדקו את הבקשה שלך ויעניקו את ההרשאות הנדרשות
              </p>


              <img
                className="loogo-20"
                alt="Loogo"
                src="https://cdn.animaapp.com/projects/67716ec48605776e046a88d7/releases/67740b23f2c0899444b67137/img/loogo-02-1x-png-1x-png@1x.png"
              />


              <div className="rectangle-20" />

              <img
                className="icon-ionic-ios-arrow-4"
                alt="Icon ionic ios arrow"
                src="https://cdn.animaapp.com/projects/67716ec48605776e046a88d7/releases/67719a70d81a908c78eecf1d/img/icon-ionic-ios-arrow-down-1@1x.png"
              />

              <div className="text-wrapper-48">מסמכים</div>

              <p className="text-wrapper-49" style={{ marginLeft: '-10px', fontWeight: '600' }} >
                אנא העלה את המסמכים המבוקשים כדי לאמת את העסק שלך
              </p>

              <div
                className="group-20"
                onClick={() => document.getElementById('businessDoc').click()}
                style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}
              >
                <img
                  className="icon-awesome-file-2"
                  alt="Icon awesome file"
                  src="https://cdn.animaapp.com/projects/67716ec48605776e046a88d7/releases/67740b23f2c0899444b67137/img/icon-awesome-file-alt-1x-png@1x.png"
                />
                <div
                  className="text-wrapper-50"
                  style={{ color: businessDoc ? '#37d288' : '#ffffff', marginLeft: '-10px', fontWeight: '600' }}
                >
                  תעודת עסק/חברה/ארגון
                </div>
                <input
                  id="businessDoc"
                  type="file"
                  style={{ display: 'none' }}
                  onChange={(e) => handleFileChange(e, setBusinessDoc)}
                />
              </div>

              {/* רישיון עסק */}
              <div
                className="group-21"
                onClick={() => document.getElementById('license').click()}
                style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}
              >
                <img
                  className="icon-awesome-file-3"
                  alt="Icon awesome file"
                  src="https://cdn.animaapp.com/projects/67716ec48605776e046a88d7/releases/67740b23f2c0899444b67137/img/icon-awesome-file-alt-1x-png@1x.png"
                />
                <div
                  className="text-wrapper-51"
                  style={{ color: license ? '#37d288' : '#ffffff', marginLeft: '-10px', fontWeight: '600' }}
                >
                  רישיון עסק
                </div>
                <input
                  id="license"
                  type="file"
                  style={{ display: 'none' }}
                  onChange={(e) => handleFileChange(e, setLicense)}
                />
              </div>

              {/* תמונה של אמצעי זיהוי */}
              <div
                className="group-22"
                onClick={() => document.getElementById('idDoc').click()}
                style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}
              >
                <img
                  className="icon-awesome-file-3"
                  alt="Icon awesome file"
                  src="https://cdn.animaapp.com/projects/67716ec48605776e046a88d7/releases/67740b23f2c0899444b67137/img/icon-awesome-file-alt-1x-png@1x.png"
                />
                <div
                  className="text-wrapper-52"
                  style={{ color: idDoc ? '#37d288' : '#ffffff', marginLeft: '-10px', fontWeight: '600' }}
                >
                  תמונה של אמצעי זיהוי
                </div>
                <input
                  id="idDoc"
                  type="file"
                  style={{ display: 'none' }}
                  onChange={(e) => handleFileChange(e, setIdDoc)}
                />
              </div>

              <div
                className="group-23"
                onClick={handleSubmit}  // לחיצה מפעילה את הפונקציה
                role="button"
                tabIndex={0}  // מאפשר הפעלה גם בלחיצה דרך מקלדת
                style={{  cursor: 'pointer' }}
              >
                <div className="overlap-group-4">
                  <div className="rectangle-21" />

                  <div className="text-wrapper-53">הגש בקשה</div>

                  <div className="layer">
                    <img
                      className="path-4"
                      alt="Path"
                      src="https://cdn.animaapp.com/projects/67716ec48605776e046a88d7/releases/67740b23f2c0899444b67137/img/path-5@1x.png"
                    />
                  </div>
                </div>
              </div>




            </div>



          </div>

          <div className="group-24">
            <input className="text-input-3" placeholder="דואר אלקטרוני" />
          </div>

          <div className="group-25">
            <input className="text-input-4" placeholder="סיסמא" />
          </div>

          <div className="group-5">
            <input className="text-input-5" placeholder="תעודת זהות" />
          </div>
        </div>
      </div>
    </div>
  );
};
