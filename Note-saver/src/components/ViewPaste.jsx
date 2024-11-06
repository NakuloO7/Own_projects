import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import {useDispatch, useSelector} from 'react-redux';
import { addToPastes, updateToPastes } from "../redux/pasteSlice";


export const ViewPaste = ()=>{
    const {id} = useParams();
    const allPastes = useSelector(state => state.paste.pastes);
    const paste = allPastes.filter(i => i._id === id)[0];




    return<div>
    <div className="flex flex-row, gap-7 place-content-between">
      <input
        className="p-2 rounded-2xl mt-2 pl-4 w-[66%]"
        type="text"
        placeholder="Enter Title"
        value={paste.title}
        disabled
        onChange={(e) => setTitle(e.target.value)}
      />
    </div>

    <div className="mt-8">
      <textarea
        className="rounded-2xl mt-4 min-w-[500px] p-4"
        value={paste.content}
        placeholder="Enter your text here"
        disabled
        onChange={(e) => setValue(e.target.value)}
        rows={20}
      />
    </div>
  </div>
}