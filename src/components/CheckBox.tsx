import React, {ChangeEvent} from 'react';
type CheckBoxType={
    isDone:boolean
    callBack:(checked:boolean)=>void
}
const CheckBox = (props:CheckBoxType) => {
    const onChangeStatusHandler=(e:ChangeEvent<HTMLInputElement>)=>{
        props.callBack(e.currentTarget.checked)
    }
    return (
        <input type="checkbox" checked={props.isDone}
                   onChange={onChangeStatusHandler}/>


            /*<input type="checkbox" checked={props.isDone}
                   onChange={(e) => onChangeStatusHandler(t.id, e.currentTarget.checked)}/>*/

    );
};

export default CheckBox;