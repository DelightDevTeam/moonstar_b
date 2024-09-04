import React, { useContext, useState } from "react";
import home from "../assets/images/home.png";
import slot from "../assets/images/slot.png";
import fish from "../assets/images/fishing.png";
import casino from "../assets/images/casino.png";
import sport from "../assets/images/sport.png";
import "../assets/css/games.css";
import GameHeading from "./GameHeading";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import BASE_URL from "../hooks/baseURL";
import { Spinner } from "react-bootstrap";
import launchGame from "../helpers/LaunchGame";
import launchLobby from "../helpers/LaunchLobby";
import { AuthContext } from "../context/AuthContext";

const GameTabs = () => {
  const { content } = useContext(AuthContext);
  const [selectedTab, setSelectedTab] = useState("all");
  const navigate = useNavigate();

  const tabs = [
    { img: home, name: content.game_type.all, value: "all", link: "/" },
    { img: slot, name: content.game_type.slot, value: "slot", link: "?type=slot&provider=PP" },
    { img: fish, name: content.game_type.fish, value: "fishing", link: "?type=fishing&provider=PlayStar" },
    { img: casino, name: content.game_type.casino, value: "casino", link: "?type=casino&provider=PP" },
    { img: sport, name: content.game_type.sport, value: "sport", link: "?type=sport"  },
  ];

  const { data: games, loading } = useFetch(BASE_URL + "/gameType");
  let slots = games[0];
  let slotProviders = slots?.products;
  let casinos = games[1];
  let casinoProviders = casinos?.products;
  let sportbooks = games[2];
  let sportProviders = sportbooks?.products;
  let fishes = games[3];
  let fishProviders = fishes?.products;

  const changeTab = (tab) => {
    setSelectedTab(tab);
  };

  return (
    <div className="px-1 py-2 p-sm-3 p-lg-4 ">
      <div
        className="d-flex  align-items-start justify-content-start flex-lg-column gap-2"
        style={{ height: "100%" }}
      >
        <div className="gameTab1 pt-0 mt-0" style={{ height: "100%" }}>
          <div
            style={{ height: "100%" }}
            className="d-flex flex-column flex-lg-row align-items-center justify-content-center   gap-3"
          >
            {tabs.map((tab, index) => {
              return (
                <div
                  onClick={() => {
                    setSelectedTab(tab.value);
                    navigate(tab.link);
                  }}
                  key={index}
                  className={`py-2 gameTab cursor-pointer rounded-3 d-flex flex-column align-items-center justify-content-center  ${
                    tab.value === selectedTab ? "bgActive" : "bg-gradient"
                  } `}
                >
                  <img src={tab.img} className="gameTabImg" />
                  <p className="gameText">{tab.name}</p>
                </div>
              );
            })}
          </div>
        </div>
        <div className="gameTab2 ps-3 bg-waring">
          {selectedTab == "all" && (
            <AllTab
              changeTab={changeTab}
              slots={slots}
              casinos={casinos}
              sportbooks={sportbooks}
              fishes={fishes}
              slotProviders={slotProviders}
              casinoProviders={casinoProviders}
              sportProviders={sportProviders}
              fishProviders={fishProviders}
              loading={loading}
              content={content}
            />
          )}
          {selectedTab == "slot" && (
            <GameListTab providers={slotProviders} type={slots} />
          )}
          {selectedTab == "fishing" && <GameListTab providers={fishProviders} type={fishes} />}
          {selectedTab == "casino" && <GameListTab providers={casinoProviders} type={casinos} />}
          {selectedTab == "sport" && <SportTab sportProviders={sportProviders} sportbooks={sportbooks} />}
        </div>
      </div>
    </div>
  );
};

export default GameTabs;

const AllTab = ({
  changeTab,
  slotProviders,
  casinoProviders,
  sportProviders,
  fishProviders,
  sportbooks,
  loading,
  content
}) => {
  return (
    <>
      {loading && <Spinner size="lg" />}
      <GameHeading title={content.game_type.slot} />
      <div className="row">
        {slotProviders &&
          slotProviders.map((game, index) => {
            return (
              <Link
                key={index}
                to={"?type=slot" + "&provider=" + game.short_name}
                onClick={() => changeTab("slot")}
                className="col-6 col-sm-4 col-md-3 col-lg-2 px-1 px-md-3  mb-2 mb-sm-4 cursor-pointer"
                
                // onClick={getGameList(slots?.name, game?.short_name)}
              >
                <div className="gameCard p-1 rounded-3">
                  <img src={game.imgUrl} className="img-fluid rounded-3" />
                  {/* <img src={game.providerImg} className="  gameProviderImg" /> */}
                </div>
              </Link>
            );
          })}
      </div>
      <GameHeading title={content.game_type.fish} />
      <div className="row">
        {fishProviders &&
          fishProviders.map((game, index) => {
            return (
              <Link
                key={index}
                to={"?type=fishing" + "&provider=" + game.short_name}
                onClick={() => changeTab("fishing")}
                className="col-6 col-sm-4 col-md-3 col-lg-2 px-1 px-md-3  mb-2 mb-sm-4 cursor-pointer"
              >
                <div className="gameCard p-1 rounded-3">
                  <img src={game.imgUrl} className="img-fluid rounded-3" />
                  {/* <img src={game.providerImg} className="  gameProviderImg" /> */}
                </div>
              </Link>
            );
          })}
      </div>
      <GameHeading title={content.game_type.casino} />
      <div className="row">
        {casinoProviders &&
          casinoProviders.map((game, index) => {
            return (
              <Link
                key={index}
                to={"?type=casino" + "&provider=" + game.short_name}
                onClick={() => changeTab("casino")}
                className="col-6 col-sm-4 col-md-3 col-lg-2 px-1 px-md-3  mb-2 mb-sm-4 cursor-pointer"
              >
                <div className="gameCard p-1 rounded-3">
                  <img src={game.imgUrl} className="img-fluid rounded-3" />
                  {/* <img src={game.providerImg} className="  gameProviderImg" /> */}
                </div>
              </Link>
            );
          })}
      </div>
      <GameHeading title={content.game_type.sport} />
      <div className="row">
        {sportProviders &&
          sportProviders.map((game, index) => {
            return (
              <div
                key={index}
                className="col-6 col-sm-4 col-md-3 col-lg-2 px-1 px-md-3  mb-2 mb-sm-4 cursor-pointer"
                onClick={launchLobby(sportbooks?.code, game.code)}
              >
                <div className="gameCard p-1 rounded-3">
                  <img src={game.imgUrl} className="img-fluid rounded-3" />
                  {/* <img src={game.providerImg} className="  gameProviderImg" /> */}
                </div>
              </div>
            );
          })}
      </div>
    </>
  );
};

const GameListTab = ({ providers, type }) => {
  const [searchParams] = useSearchParams();
  const gameType = searchParams.get("type");
  const gameProvider = searchParams.get("provider");
  const navigate = useNavigate();
  const typeId = type?.code;
  const provider = providers?.filter(
    (p) => p?.short_name === gameProvider
  )[0]?.id;
  let hotGames = type?.hotgame;


  const { data: games, loading } = useFetch(
    BASE_URL + "/game/gamelist/" + provider + "/" + typeId
  );
    // console.log(games);

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <>
          <div className="row mt-4">
            {providers &&
              providers.map((item, index) => {
                return (
                  <div
                    key={index}
                    className="col-6 col-sm-4 col-md-3 col-lg-2 px-2 mb-2 mb-sm-4 cursor-pointer  "
                  >
                    <div
                      onClick={() =>
                        navigate("?type=slot&provider=" + item.short_name)
                      }
                      className=" bg-gradient p-1 rounded-3 d-flex flex-column align-items-center"
                    >
                      <img
                        src={item.imgUrl}
                        className="mt-2 providerGame rounded-3"
                      />
                      {/* <img src={item.providerImg} className="providerImg" /> */}
                    </div>
                  </div>
                );
              })}
          </div>
          {hotGames.length > 0 && (
            <>
              <GameHeading title={"Hot Slots"} />
              <div className="row">
                {hotGames &&
                  hotGames.map((game, index) => {
                    return (
                      <div
                        key={index}
                        className="col-6 col-sm-4 col-md-3 col-lg-2 px-1 px-md-3  mb-2 mb-sm-4 cursor-pointer"
                      >
                        <div className="gameCard p-1 rounded-3">
                          <img src={game.image_url} className="img-fluid rounded-3" />
                          {/* <img
                            src={game.providerImg}
                            className="  gameProviderImg"
                          /> */}
                        </div>
                      </div>
                    );
                  })}
              </div>
            </>
          )}
        </>
      )}
      {gameType && gameProvider && (
        <>
          <h4 className="text-white fw-bold my-2">
            {gameType.toUpperCase()} {gameProvider.toUpperCase()} GAMES
          </h4>
          <div className="row">
            {games &&
              games.map((game, index) => {
                return (
                  <div
                    key={index}
                    className="col-6 col-sm-4 col-md-3 col-lg-2 px-1 px-md-3  mb-2 mb-sm-4 cursor-pointer"
                    onClick={launchGame(type?.code, game?.product_code, game?.code)}
                  >
                    <div className="gameCard p-1 rounded-3">
                      <img
                        src={game.image_url}
                        className="img-fluid rounded-3"
                      />
                      {/* <img
                      src={filteredGames.providerImg}
                      className="  gameProviderImg"
                    /> */}
                    </div>
                  </div>
                );
              })}
          </div>
        </>
      )}
    </>
  );
};

const SportTab = ({ sportProviders, sportbooks }) => {
  return (
    <>
      <h4 className="text-white fw-bold my-2">Sport GAMES</h4>
      <div className="row">
        {sportProviders &&
          sportProviders.map((game, index) => {
            return (
              <div
                key={index}
                className="col-6 col-sm-4 col-md-3 col-lg-2 px-1 px-md-3  mb-2 mb-sm-4 cursor-pointer"
                onClick={launchLobby(sportbooks?.code, game.code)}
              >
                <div className="gameCard p-1 rounded-3">
                  <img src={game.imgUrl} className="img-fluid rounded-3" />
                  {/* <img src={game.providerImg} className="  gameProviderImg" /> */}
                </div>
              </div>
            );
          })}
      </div>
    </>
  );
};
