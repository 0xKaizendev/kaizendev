"use client";
import clsx from "clsx";
import React from "react";
import HeaderTitle from "./header-title";
import { CodeEditor } from "./code-editor";
import { motion as m } from "framer-motion";
const animation = {
  hide: { x: 32, opacity: 0 },
  show: {
    x: 0,
    opacity: 1,
  },
};

const Header = () => {
  return (
    <header id="page-header">
      <div className={"w-full "}>
        <div className={clsx("relative w-full ")}>
          <div
            className={clsx(
              "relative z-10 flex flex-col  lg:flex-row gap-10 ",
            )}
          >
            <HeaderTitle />
            <m.div
              initial={animation.hide}
              animate={animation.show}
              transition={{ delay: 0.1 }}
              className=" md:w-full"
            >
              <CodeEditor
                code={`// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract MerkleVerifier  {
    bytes32 public merkleRoot;

    constructor(bytes32 _merkleRoot) {
        merkleRoot = _merkleRoot;
    }

    function verify(bytes32[] memory proof, bytes32 leaf) public view returns (bool) {
        bytes32 hash = leaf;
        for (uint256 i = 0; i < proof.length; i++) {
            hash = hash <= proof[i] ? keccak256(abi.encodePacked(hash, proof[i])) : keccak256(abi.encodePacked(proof[i], hash));
        }
        return hash == merkleRoot;
    }
}

`}
                language="solidity"
              />
            </m.div>
            {/*  */}
          </div>
        </div>
      </div>
    </header>
  );
};
// background-grid--fade-out background-grid
export default Header;
