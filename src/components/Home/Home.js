import "./Home.css";

//  Import from HomeStyle - styled components

import "./HomeStyle";
import { TabButton } from "./HomeStyle";

import fishArray from "../../aquaData";

import { useState, useRef } from "react";
//import { valid } from server

const Home = () => {
  const fishCount = useRef(fishArray.length);

  const [listOfFish, setlistOfFish] = useState(fishArray);
  const [newFish, setNewFish] = useState({
    id: fishCount.current + 1,
    name: "",
    surname: "",
    size: "",
  });
  const [valid, setValid] = useState(false);
  const [activeTab, setActiveTab] = useState("list-of-fish");

  const bigFishTotal = useRef(3);
  const smallFishTotal = useRef(2);
  const [fishConsAct, setFishConsAct] = useState(
    bigFishTotal.current * 20 + smallFishTotal.current * 10
  );

  const [fishConsReq, setFishConsReq] = useState(0);

  const [aquaSize, setAquaSize] = useState({
    width: 0,
    length: 0,
    height: 0,
  });

  const handleChange = (event) => {
    const updateFish = {
      ...newFish,
      [event.target.name]: event.target.value,
    };
    setNewFish(updateFish);
    validateData(updateFish);
  };

  //useEffect(() => {});

  const validateData = (fish) => {
    if (fish.size === "") {
      return setValid(false);
    } else if (fish.name.trim().length === 0) {
      return setValid(false);
    } else if (fish.surname.trim().length === 0) {
      return setValid(false);
    }
    setValid(true);
  };

  const handleAdd = () => {
    setlistOfFish((listOfFish) => {
      return [...listOfFish, newFish];
    });

    if (newFish.size === "Big") {
      bigFishTotal.current++;
    } else {
      smallFishTotal.current++;
    }

    //const newId = newFish.id + 1;
    fishCount.current++;
    const updateFish = {
      //id: newId,
      id: fishCount.current + 1,
      name: "",
      surname: "",
      size: "",
    };
    setNewFish(updateFish);
    setValid(false);
    setFishConsAct(bigFishTotal.current * 20 + smallFishTotal.current * 10);

    const radioButtons = document.querySelectorAll('input[type="radio"]');
    radioButtons.forEach((btn) => (btn.checked = false));

    //setAquaSize({ width: 0, length: 0, height: 0 });
  };

  const handleDelete = (idToDel) => {
    listOfFish.filter((fishArray) => {
      if (fishArray.id === idToDel) {
        if (fishArray.size === "Big") {
          bigFishTotal.current--;
        } else {
          smallFishTotal.current--;
        }
      }
    });
    setlistOfFish(listOfFish.filter((fishArray) => fishArray.id !== idToDel));
    setFishConsAct(bigFishTotal.current * 20 + smallFishTotal.current * 10);
    //setAquaSize({ width: 0, length: 0, height: 0 });
  };

  const aquaSizeOnChange = (e) => {
    const updateAquaSize = {
      ...aquaSize,
      [e.target.name]: e.target.value,
    };

    const submitBtn = document.querySelector(".buttonSubmitPlan");
    submitBtn.setAttribute("disabled", "disabled");
    submitBtn.style.backgroundColor = "red";

    setAquaSize(updateAquaSize);
    let aquaVolume =
      (updateAquaSize.width * updateAquaSize.length * updateAquaSize.height) /
      1000;
    setFishConsReq(aquaVolume);

    if (fishConsAct <= aquaVolume) {
      submitBtn.style.backgroundColor = "green";
      submitBtn.removeAttribute("disabled");
    }
  };

  const updateActive = () => {
    window.alert("Aquarium calculation was done.");
  };

  return (
    <div>
      <div className="pageContainer">
        <div className="fishList fishForm buttonsType">
          <TabButton
            name="list-of-fish"
            data-active={activeTab}
            onClick={() => {
              setActiveTab("list-of-fish");
            }}
          >
            Fish list
          </TabButton>
          <TabButton
            name="aquarium-planning"
            data-active={activeTab}
            onClick={() => {
              setActiveTab("aquarium-planning");
            }}
          >
            Aquarium
          </TabButton>
        </div>

        {activeTab === "list-of-fish" && (
          <>
            <div className="fishList" name="fishList">
              {listOfFish.map((fish) => {
                return (
                  <div className="fishItem" key={fish.id}>
                    {fish.name} {fish.surname} - {fish.size}
                    <button
                      className="buttonDelete"
                      onClick={() => {
                        handleDelete(fish.id);
                      }}
                    >
                      X
                    </button>
                  </div>
                );
              })}
            </div>

            <div className="fishList fishForm">
              <input
                className="inputType"
                type="text"
                placeholder="Name"
                name="name"
                value={newFish.name}
                onChange={handleChange}
              />
              <input
                className="inputType"
                type="text"
                placeholder="Surname"
                name="surname"
                value={newFish.surname}
                onChange={handleChange}
              />
              <div onChange={handleChange}>
                <label>
                  <input type="radio" value="Big" name="size" />
                  Big
                </label>
                <label>
                  <input type="radio" value="Small" name="size" />
                  Small
                </label>
              </div>
              <div>
                <button
                  className="buttonSubmit"
                  onClick={handleAdd}
                  disabled={!valid}
                >
                  Add fish
                </button>
              </div>
            </div>
          </>
        )}

        {activeTab === "aquarium-planning" && (
          <>
            <h3>Aquarium sizes setup with amount of fish available</h3>
            <p>
              Number of Big fish in the list (20 litres/big fish):{" "}
              {bigFishTotal.current}
            </p>
            <p>
              Number of Small fish in the list (10 litres/small fish):{" "}
              {smallFishTotal.current}
            </p>
            <p>Actual water requirement calculation: {fishConsAct} litres</p>
            <p>
              {fishConsAct} litres = {bigFishTotal.current} big fish * 20 litres
              + {smallFishTotal.current} small fish * 10 litres
            </p>
            <div className="fishList fishForm aquaForm">
              <label>
                Enter width (cm):
                <input
                  className="inputTypePlanning"
                  type="number"
                  min="0"
                  placeholder="Enter width (cm)"
                  name="width"
                  value={aquaSize.width}
                  onChange={aquaSizeOnChange}
                />
              </label>
              <label>
                Enter length (cm):
                <input
                  className="inputTypePlanning"
                  type="number"
                  min="0"
                  placeholder="Enter length (cm)"
                  name="length"
                  value={aquaSize.length}
                  onChange={aquaSizeOnChange}
                />
              </label>
              <label>
                Enter height (cm):
                <input
                  className="inputTypePlanning"
                  type="number"
                  min="0"
                  placeholder="Enter height (cm)"
                  name="height"
                  value={aquaSize.height}
                  onChange={aquaSizeOnChange}
                />
              </label>

              <p>
                Amount of water in aquarium based on selected sizes:{" "}
                {fishConsReq} litres
              </p>
              <p>
                {fishConsReq} [litres]= {aquaSize.width} [cm] *{" "}
                {aquaSize.length} [cm] * {aquaSize.height} [cm] / 1000{" "}
              </p>
              <button className="buttonSubmitPlan" onClick={updateActive}>
                Submit sizes
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Home;
