import React, { useState } from "react";
import "../style/AddEvent2.css";

export const AddEvent2 = () => {
    const [formData, setFormData] = useState({
        eventType: "",
        title: "",
        description: "",
        link: "",
        image: null,
        date: "",
        time: "",
    });

    const [imageUploaded, setImageUploaded] = useState(false);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFormData({ ...formData, image: file });
            setImageUploaded(true);  // מצב שמורה כי התמונה הועלתה
        }
    };



    return (
        <div className="artboard">
            <div className="overlap-wrapper">
                <div className="overlap">
                    <div className="rectangle" />

                    <div className="div" />

                    <div className="rectangle-2" />

                    <div className="rectangle-3" />

                    <div className="text-wrapper">קמפאי סטרייט ווק</div>

                    <div className="text-wrapper-2">הוסף אירוע</div>

                    <div className="text-wrapper-3">סוג האירוע</div>

                    <div className="text-wrapper-4">שם האירוע</div>

                    <div className="text-wrapper-5">לינק לאירוע (לא חובה)</div>

                    <div className="text-wrapper-6">תאריך וזמן התחלה</div>

                    <div className="text-wrapper-7">תיאור האירוע</div>

                    <div className="text-wrapper-8">מסעדה אסייתית</div>

                    <img
                        className="loogo"
                        alt="Loogo"
                        src="https://cdn.animaapp.com/projects/67716ec48605776e046a88d7/releases/67719a70d81a908c78eecf1d/img/loogo-02-1x-png@1x.png"
                    />

                    <div
                        className="group"
                        onClick={() => document.getElementById('image').click()}
                        style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
                    >
                        <img
                            className="icon-awesome-file"
                            alt="Icon awesome file"
                            src="https://cdn.animaapp.com/projects/67716ec48605776e046a88d7/releases/67719a70d81a908c78eecf1d/img/icon-awesome-file-alt-1x-png@1x.png"
                        />
                        <div
                            className="text-wrapper-9"
                            style={{ color: imageUploaded ? '#38d288' : '#ffffff' }}
                        >
                            בחר תמונה
                        </div>
                        <input
                            id="image"
                            name="image"
                            type="file"
                            className="add-event-input"
                            onChange={handleImageChange}
                            style={{
                                display: 'none',
                            }}
                        />
                    </div>
                    <img
                        className="icon-ionic-ios-arrow"
                        alt="Icon ionic ios arrow"
                        src="https://cdn.animaapp.com/projects/67716ec48605776e046a88d7/releases/67719a70d81a908c78eecf1d/img/icon-ionic-ios-arrow-down-1@1x.png"
                    />

                    <div className="DD-MM-YY-wrapper" id="customDatePicker">
                        <input type="datetime-local" id="hiddenDatePicker" />
                    </div>

                    <div className="group-wrapper">
                        <div className="text-input-wrapper">
                            <input className="text-input" placeholder="שם האירוע" />
                        </div>
                    </div>

                    <div className="overlap-group-wrapper">
                        <div className="overlap-group">
                            <div className="rectangle-4" />

                            <textarea
                                className="textarea"
                                placeholder="תיאור האירוע"
                            ></textarea>
                        </div>
                    </div>

                    <div className="input-wrapper">
                        <input className="input" placeholder="לינק האירוע" />
                    </div>

                    <div className="group-2">
                        <div className="select-wrapper">
                            <div className="select-input-wrapper">
                                <select className="select-input">
                                    <option value="" disabled selected>בחר אפשרות</option>
                                    <option value="option1">אפשרות 1</option>
                                    <option value="option2">אפשרות 2</option>
                                    <option value="option3">אפשרות 3</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className="group-3">
                        <div className="overlap-2">
                            <div className="rectangle-5" />

                            <div className="text-wrapper-10">אישור&nbsp;&nbsp; </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
