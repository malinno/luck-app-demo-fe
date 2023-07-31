/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import {
  createRef,
  PropsWithChildren,
  useEffect,
  useMemo,
  useState,
} from "react";
import ReactDOM from "react-dom";
// @ts-ignore
import { CSSTransition } from "react-transition-group";

import "./modal.css";

export type ModalProps = PropsWithChildren<{
  backdrop?: boolean;
  dismissOnBackdropClick?: boolean;
  visible?: boolean;
  zIndex?: number;
  backdropColor?: string;
  onDismiss: () => void;
  onEntered?: () => void;
}>;

const modalRoot = document.getElementById("modal");

export const Modal: React.FC<ModalProps> = ({
  backdrop = true,
  children,
  dismissOnBackdropClick = true,
  visible = false,
  zIndex = 10,
  backdropColor = "rgba(0,0,0,0.8)",
  onDismiss,
  onEntered,
}) => {
  const [initialized, setInitialized] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const ref = createRef<HTMLDivElement>();

  const el = useMemo(() => document.createElement("div"), []);

  useEffect(() => {
    modalRoot?.appendChild(el);

    return () => {
      modalRoot?.removeChild(el);
    };
  }, [el]);

  useEffect(() => {
    let timeout: any | null = null;
    if (!visible) {
      setLoaded(false);
      timeout = setTimeout(() => {
        setInitialized(false);
      }, 500);
    } else {
      setInitialized(true);
    }

    return () => {
      timeout && clearTimeout(timeout);
    };
  }, [visible]);

  useEffect(() => {
    if (initialized) {
      setLoaded(true);
    }
  }, [initialized]);

  if (!initialized) {
    return null;
  }

  const modal = (
    <div className={`modal${visible ? " on" : ""}`} style={{ zIndex }}>
      {visible && (
        <div
          className="backdrop"
          style={{
            opacity: backdrop ? 1 : 0,
            backgroundColor: backdropColor,
          }}
          onClick={() => {
            if (!dismissOnBackdropClick) {
              return;
            }
            onDismiss();
          }}
        />
      )}
      <CSSTransition
        classNames="modal-container"
        in={loaded}
        key="modal-container"
        nodeRef={ref}
        timeout={500}
        onEntered={onEntered}
      >
        <div className="modal-content noselect" ref={ref}>
          {children}
        </div>
      </CSSTransition>
    </div>
  );

  return ReactDOM.createPortal(modal, el);
};
