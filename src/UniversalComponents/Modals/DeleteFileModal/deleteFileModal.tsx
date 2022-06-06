import * as React from "react";
import { isNullOrUndefined } from "is-what";

interface Props {
  documentName: string;
  deleteStatus: number;
  fileId: string;
  deleteFile: (fileId: string) => void;
}

export default class DeleteFileModal extends React.Component<Props> {
  componentDidMount() {
    document.addEventListener("mouseup", this.handleOutsideClick, false);
  }

  handleOutsideClick = (e: MouseEvent) => {
    let outsideDiv = document.getElementById("deleteModal");
    if (!isNullOrUndefined(outsideDiv)) {
      if (e.target === outsideDiv) {
        document.getElementById("delete-btn-outside-click")?.click();
        window.location.reload();
      }
    }
  };

  render() {
    let { deleteStatus, documentName, deleteFile, fileId } = this.props;
    return (
      <div className="col-md-12 col-12">
        <div
          className="row modal"
          id="deleteModal"
          aria-labelledby="deleteModal"
          aria-hidden="true"
          data-backdrop="false"
        >
          <div className="col-md-12 modal-dialog">
            <div className="row">
              <div className="col-md-12 modal-content">
                <div className="row">
                  <div className="col-md-12 my-3">
                    <div className="modal-body modal-title">
                      Are you sure you want to delete {documentName}?
                      <span
                        id="delete-btn-outside-click"
                        data-dismiss="modal"
                        style={{ display: "none" }}
                      >
                        <img src="/static_images/close-modal-icn.svg" />
                      </span>
                    </div>
                    <img
                      src="/static_images/delete-file-icn.svg"
                      style={{ marginBottom: "3%" }}
                      alt="delete"
                    />
                    <div className="modal-body modal-subtitle">
                      This document will be deleted immediately. You can’t undo
                      this action.
                    </div>
                    {deleteStatus === -1 && (
                      <div
                        className="modal-body modal-subtitle"
                        style={{ margin: "0 25%", lineHeight: "28px" }}
                      >
                        <span data-dismiss="modal" className="mailto-riverus">
                          Cancel
                        </span>
                        <button
                          className="upload-yellow-btn"
                          style={{ float: "right", padding: "2% 10%" }}
                          onClick={() => deleteFile(fileId)}
                        >
                          Delete
                        </button>
                      </div>
                    )}
                  </div>
                </div>
                {this.switchDeleteStatus()}
                {deleteStatus !== -1 && (
                  <div
                    className="col-md-12 modal-subtitle"
                    style={{ textAlign: "center", lineHeight: "40px" }}
                  >
                    Please write to&nbsp;
                    <a
                      className="mailto-riverus"
                      href="mailto:hello@riverus.in."
                    >
                      hello@riverus.in
                    </a>
                    &nbsp;for help.
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  switchDeleteStatus() {
    let { deleteStatus, deleteFile, fileId } = this.props;
    switch (deleteStatus) {
      case 0: {
        return (
          <div className="row">
            <div className="col-md-12 error-message-container pt-2">
              <div className="row">
                <div className="col-md-12">
                  <div className="row">
                    <div className="col-md-4">
                      <img
                        src="/static_images/delete-file-failure-icn.svg"
                        style={{ marginBottom: "3%" }}
                        alt="delete"
                      />
                    </div>
                    <div className="col-md-8">
                      <div
                        className="modal-body modal-subtitle align-left"
                        style={{ color: "#8C0000" }}
                      >
                        Something went wrong!
                      </div>
                      <div className="modal-body modal-subtitle">
                        Please try again.
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div
                      className="modal-body modal-subtitle"
                      style={{ margin: "0 25%", lineHeight: "28px" }}
                    >
                      <span data-dismiss="modal" className="mailto-riverus">
                        Cancel
                      </span>
                      <button
                        className="upload-yellow-btn"
                        style={{ float: "right", padding: "2% 10%" }}
                        onClick={() => deleteFile(fileId)}
                      >
                        Retry
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      }
      case 1: {
        return (
          <div className="row">
            <div className="col-md-12 success-message-container pt-2">
              <div className="row">
                <div className="col-md-12">
                  <div className="row">
                    <div className="col-md-4">
                      <img
                        src="/static_images/delete-file-success-icn.svg"
                        style={{ marginBottom: "3%" }}
                        alt="delete"
                      />
                    </div>
                    <div className="col-md-8">
                      <div
                        className="modal-body modal-subtitle"
                        style={{ width: "70%" }}
                      >
                        The document has been successfully deleted.
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div
                  data-dismiss="modal"
                  className="modal-body mailto-riverus"
                  onClick={() => window.location.reload()}
                >
                  Go Back
                </div>
              </div>
            </div>
          </div>
        );
      }
      default: {
        return <div />;
      }
    }
  }
}
