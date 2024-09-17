import {useEffect, useState} from "react";
import {TextField} from "@mui/material";

function App() {
    const [n, setN] = useState(2);
    const [m, setM] = useState(2);

    const [calculation, setCalculation] = useState(0);

    function calculate(a: number, b: number): number{
        if(a%2 != 0 && b%2 != 0) return 0;
        let ret = 0;
        for(let j = 1; j <= Math.ceil(a/2); j++){
            for(let k = 1; k <= Math.ceil(b/2); k++){
                const calc = (4 * Math.pow(Math.cos(j * Math.PI / (a+1)), 2)) + (4 * Math.pow(Math.cos(k * Math.PI / (b+1)), 2))
                if(ret == 0) ret = calc;
                else ret *= calc;
            }
        }
        return Math.trunc(ret);
    }

    useEffect(() => {
        setCalculation(calculate(n, m));
    }, [n, m])

    return (
    <>
        <div className="p-5 flex flex-col items-start font-roboto w-screen h-screen mb-[60px]">
            <h1 className="text-4xl font-bold">Tiles Filling Estimator</h1>
            <hr className="bg-black w-[100%] mt-5 mb-5 "/>
            <h2 className="text-lg font-bold pb-5">What the heck does this do?</h2>
            <p className="text-wrap">Have you ever had to solve a question to fill in a M by N "wall" with only fixed
                sized tiles? Well, this is for you. This tool will calculate the number of ways you can fill in a NXM
                wall by only using 2X1 tiles! I referenced <a className="hover:text-indigo-700 text-indigo-500"
                                                              href="https://arxiv.org/pdf/2206.04437"
                                                              target="_blank">this</a> paper.<br/></p>
            <hr className="bg-black w-[100%] mt-5 mb-5 "/>
            <h2 className="text-lg font-bold pb-5">How do I use this tool?</h2>
            <p>Enter the dimensions of your wall (M, N). The tool will spit out the numbers very soon!</p>
            <hr className="bg-black w-[100%] mt-5 mb-5 "/>
            <form className="flex flex-col">
                <TextField id="outlined-basic" required margin="normal" label="N" variant="outlined" defaultValue={2} className="z-0"
                           onChange={(e) => {
                               if (e.target.value == "") {
                                   setN(0);
                                   e.target.value = "0";
                               } else {
                                   console.log(e.target.value);
                                   if (e.target.value == "00" || e.target.value == "") e.target.value = e.target.value.replace(/^0+/, '0');
                                   else e.target.value = e.target.value.replace(/^0+/, '');
                                   setN(parseInt(e.target.value));
                               }
                           }}>{n}</TextField>

                <TextField id="outlined-basic" required margin="normal" label="M" variant="outlined" defaultValue={2} className="z-0"
                           onChange={(e) => {
                               if (e.target.value == "") {
                                   setM(0);
                                   e.target.value = "0";
                               } else {
                                   if (e.target.value == "00" || e.target.value == "") e.target.value = e.target.value.replace(/^0+/, '0');
                                   else e.target.value = e.target.value.replace(/^0+/, '');
                                   setM(parseInt(e.target.value));
                               }
                           }}>{m}</TextField>
            </form>

            <h2 className="text-lg pt-5 text-indigo-800 mb-5">Number of ways to assemble = {calculation}</h2>

            <p>Work in Progress - Displaying Generating Functions for non-2X1 blocks</p>
            <div className="fixed bottom-0 w-[100%] bg-white">
                <hr className="bg-black w-[100%] mb-5"/>
                <p className="pb-5">You can view the source code <a className="hover:text-indigo-700 text-indigo-500"
                                                   href="https://github.com/shinlee03/tile-estimator/"
                                                   target="_blank">here</a>.</p>
            </div>

        </div>


    </>
    )
}

export default App
