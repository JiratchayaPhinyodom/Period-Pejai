import React from "react";

const ButtonKub = ({ imageSrc, active, value, setBloodLevel }) => {
    return (
        <div>
            <button className="small-blood-level-block" onClick={() => setBloodLevel(value)} style={{ backgroundColor: active ? "red" : "transparent" }}>
                {[...Array(value)].map((_, index) => (
                    <img style={{ width: "30px" }} key={index} src={imageSrc} alt="" />
                ))}
            </button>
        </div>
    );
};

export default ButtonKub;