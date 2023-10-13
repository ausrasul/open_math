import React from "react"
import presenter from "./presenter"
import View from "./View"

const gameParams ={
    numOfQuestions: 20,
    maxTime: 10000,
    maxPoints: 10,
}
export default function MultiplicationTable(props){
    const p = new presenter(gameParams)
    return (
        <View {...props} presenter={p} />
    )
}