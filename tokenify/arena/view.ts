import fetch from "node-fetch";
import data from "./config.json";
import chalk from "chalk";
import { tokenify, renewToken } from "../../tokenify/";
import { RequestInit } from "node-fetch";
