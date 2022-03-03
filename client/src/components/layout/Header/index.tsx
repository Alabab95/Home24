import { Badge } from "@material-ui/core";
import { Search, ShoppingCartOutlined } from "@material-ui/icons";
import React, { useContext, useState } from "react";
import styled from "styled-components";
import { mobile } from "../../../responsive";
import { DataContext } from '../../../context/data';
import "./index.css";

const HeaderBar = () => {
  const { querySearch, setQuerySearch } = useContext(DataContext);
  const [query, setQuery] = useState<string>("");

  const MenuItem = styled.div`
    font-size: 14px;
    cursor: pointer;
    margin-left: 25px;
    ${mobile({ fontSize: "12px", marginLeft: "10px" })}
  `;

  const handlChange = (e: any) => {
    e.preventDefault();
    setQuery(e.target.value);
    setQuerySearch(e.target.value);
  };

  const search = () => {};

  return (
    <div className="container">
      <div className="wrapper">
        <div className="left">
          <input
            className="search"
            placeholder="Search"
            value={querySearch}
            onChange={handlChange}
          />
        </div>
        <div className="center">
          <div className="logo">
            <img
              data-testid="brand-logo"
              alt="home24 - Möbel online kaufen"
              src="https://www.home24.de/corgi/static/media/home-24-logo.4f73bd13.svg"
              width="86.5px,93px,118px"
              height="30.8px,33px,42px"
            />
          </div>
        </div>
        <div className="right">
          <MenuItem>
            <Badge badgeContent={4} color="secondary">
              <ShoppingCartOutlined />
            </Badge>
          </MenuItem>

          <button className="button">REGISTER</button>
          <button className="button">SIGN IN</button>
        </div>
      </div>
    </div>
  );
};
export default HeaderBar