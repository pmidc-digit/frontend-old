import React from "react";
import { UploadFile, UploadedDocument } from "egov-ui-framework/ui-atoms";
import "./index.css"; 

const UploadSingleFile = ({
  uploaded,
  classes,
  handleFileUpload,
  documents,
  removeDocument,
  onButtonClick,
  inputProps,
  buttonLabel,
  id
}) => {
  return (
    <div>
      {!uploaded && (
        <UploadFile
          buttonProps={{
            variant: "outlined",
            color: "primary",
            onClick: onButtonClick
          }}
          id={id}
          handleFileUpload={handleFileUpload}
          inputProps={{ multiple: false, ...inputProps }}
          classes={classes}
          buttonLabel={buttonLabel}
        />
      )}
      {uploaded && (
        <div>
          {documents &&
            documents.map((document, documentIndex) => {
              return (
                <div className="pt-upoaded-document" key={documentIndex}>
                  {document && (
                    <UploadedDocument
                      document={document}
                      removeDocument={removeDocument}
                    />
                  )}
                </div>
              );
            })}
        </div>
      )}
    </div>
  );
};

export default UploadSingleFile;
