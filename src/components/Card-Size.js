import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { fetchProducts } from "../redux/actions/productAction";
import AddedMinusMark from "./Add-MinusMark";

const CardSize = ({ filter, obj }) => {
  const ctSize0to20 =
    filter && filter[obj] && filter[obj].slice && filter[obj].slice(0, 39);
  const ctSizeXStoXXXL = filter && filter[obj] && filter[obj].slice(40, 52);
  const ctSizeONESIZE = filter && filter[obj] && filter[obj].slice(-1);
  const [isHidden, setIsHidden] = useState(false);
  const [clickedButtons, setClickedButtons] = useState({});

  const dispatch = useDispatch();
  let seletedFilters = JSON.parse(JSON.stringify(filter));

  const hiddenList = () => {
    setIsHidden(!isHidden);
  };
  const toggleButtonClick = (index) => {
    setClickedButtons((prevState) => ({
      ...prevState,
      [index]: !prevState[index],
    }));

    seletedFilters[obj][index]["isChecked"] =
      !seletedFilters[obj][index]["isChecked"];
    dispatch(fetchProducts(1, seletedFilters));
  };

  useEffect(() => {
    if (filter[obj] && filter[obj].length > 0) {
      // console.log(filter[obj])
      let receivedBoxes = {};
      filter[obj].forEach((item, index) => {
        receivedBoxes[index] = item.isChecked;
      });
      // console.log(obj, '===>', receivedCheckbox)
      setClickedButtons(receivedBoxes);
    }
  }, [filter[obj]]);
  return (
    <>
      <div className="accordion-container">
        <div className="accordion-header" onClick={hiddenList}>
          <div>
            <p>{obj}</p>
          </div>
          {/*+/-*/}
          <AddedMinusMark status={isHidden} posistion={{ left: "-15px" }} />
        </div>
        {!isHidden && (
          <>
            <div className="accordion-container">
              <div className="accordion-box">
                <div className="size-box">
                  {filter &&
                    filter[obj] &&
                    filter[obj].length > 0 &&
                    ctSize0to20.map((item, index) => (
                      <div key={`${obj}_${item.name}`}>
                        <button
                          key={index}
                          onClick={() => toggleButtonClick(index)}
                          style={{
                            backgroundColor: clickedButtons[index]
                              ? "black"
                              : "white",
                            color: clickedButtons[index] ? "white" : "black",
                          }}
                          className="size-number-one"
                        >
                          {item.name}
                        </button>
                      </div>
                    ))}
                </div>
                <hr className="doted" />
                <div className="size-box">
                  {filter &&
                    filter[obj] &&
                    filter[obj].length > 0 &&
                    ctSizeXStoXXXL.map((item, index) => (
                      <div key={`${obj}_${item.name}`}>
                        <button
                          key={index + 40}
                          onClick={() => toggleButtonClick(index + 40)}
                          style={{
                            backgroundColor: clickedButtons[index + 40]
                              ? "black"
                              : "white",
                            color: clickedButtons[index + 40]
                              ? "white"
                              : "black",
                          }}
                          className="size-number-two"
                        >
                          {item.name}
                        </button>
                      </div>
                    ))}
                </div>
                <hr className="doted" />
                <div className="size-box">
                  {filter &&
                    filter[obj] &&
                    filter[obj].length > 0 &&
                    ctSizeONESIZE.map((item, index) => (
                      <div key={`${obj}_${item.name}`}>
                        <button
                          key={index + 53}
                          onClick={() => toggleButtonClick(index + 53)}
                          style={{
                            backgroundColor: clickedButtons[index + 53]
                              ? "black"
                              : "white",
                            color: clickedButtons[index + 53]
                              ? "white"
                              : "black",
                          }}
                          className="size-number-two"
                        >
                          {item.name}
                        </button>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </>
        )}
        <br />
        <hr />
      </div>
    </>
  );
};
export default CardSize;
