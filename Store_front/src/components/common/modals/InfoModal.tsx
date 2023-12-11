import React, { useEffect, useState } from "react";
import classNames from "classnames";
import"./style.css";

interface ModalActionsProps {
  open:boolean;
  title:String;
  message:string;
  acceptCallback: () => void;
  closeDialog:()=>void;
}

const InfoModal: React.FC<ModalActionsProps> = ({
    open  ,
    title,
    message,
    acceptCallback,
    closeDialog,
}) => {

  const [show, setShow] = useState<boolean>(open);

  useEffect(()=>{
    // console.log("show _ ",show)
    setShow(open);
    }
    ,[open]);

 

  return (
    <>
    <div   className={classNames("modal position-absolute", { "custom-modal": show })} role="dialog">
  <div className="modal-dialog modal-dialog-centered" role="document">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title">{title}</h5>
        <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={closeDialog}>
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div className="modal-body">
        <p>{message}</p>
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-primary" onClick={()=>{acceptCallback(); closeDialog();}}>Agree</button>
        <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={closeDialog}>Close</button>
      </div>
    </div>
  </div>
</div>
    </>
  );
};

export default InfoModal;
