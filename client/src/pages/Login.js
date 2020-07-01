import React, { useState, useEffect } from "react";
import DeleteBtn from "../components/DeleteBtn";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
import { List, ListItem } from "../components/List";
import { Input, TextArea, FormBtn } from "../components/Form";

function Login() {
    return (
      <div className='container'>
        <div className="row">
          <form className="col s12">
            <div className="row">
              <div className="input-field col s12">
                <input id="password" type="password" className="validate"/>
                <label for="password">Password</label>
              </div>
            </div>
            <div className="row">
              <div className="input-field col s12">
                <input id="email" type="email" className="validate"/>
                <label for="email">Email</label>
              </div>
            </div>
            <button class="btn waves-effect waves-light" type="submit" name="action">Login</button>
          </form>
        </div>
      </div>
    )
  }


export default Login;
