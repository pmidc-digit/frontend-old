import {
  getTextField,
  getSelectField,
  getCommonContainer,
  getDateField,
  getPattern
} from "egov-ui-framework/ui-config/screens/specs/utils";
import { getTodaysDateInYMD } from "egov-ui-framework/ui-utils/commons";

import get from "lodash/get";
import { prepareFinalObject } from "egov-ui-framework/ui-redux/screen-configuration/actions";
import { toggleSpinner } from "egov-ui-framework/ui-redux/screen-configuration/actions";
import { toggleSnackbar } from "egov-ui-framework/ui-redux/screen-configuration/actions";

const onIconClick = (state, dispatch, index) => {
  const ifscCode = get(
    state.screenConfiguration.preparedFinalObject,
    "ReceiptTemp[0].instrument.ifscCode"
  );
  if (ifscCode) {
    dispatch(toggleSpinner());
    fetch(`https://ifsc.razorpay.com/${ifscCode}`)
      .then(response => {
        return response.json();
      })
      .then(payload => {
        if (payload === "Not Found") {
          dispatch(
            prepareFinalObject("ReceiptTemp[0].instrument.bank.name", "")
          );
          dispatch(
            prepareFinalObject("ReceiptTemp[0].instrument.branchName", "")
          );
          dispatch(
            toggleSnackbar(
              true,
              {
                labelName: "Bankdetails not found for this IFSC",
                labelKey: "ERR_BANK_DETAILS_NOT_FOUND_FOR_IFSC"
              },
              "error"
            )
          );
          dispatch(toggleSpinner());
        } else {
          const bankName = get(payload, "BANK");
          const bankBranch = get(payload, "BRANCH");
          dispatch(
            prepareFinalObject("ReceiptTemp[0].instrument.bank.name", bankName)
          );
          dispatch(
            prepareFinalObject(
              "ReceiptTemp[0].instrument.branchName",
              bankBranch
            )
          );
          dispatch(toggleSpinner());
        }
      })
      .catch(error => {
        console.log(error);
        dispatch(toggleSpinner());
      });
  }
};


export const payeeDetails = getCommonContainer({
  paidBy: getSelectField({
    label: {
      labelName: "Paid By",
      labelKey: "NOC_PAYMENT_PAID_BY_LABEL"
    },
    placeholder: {
      labelName: "Paid By",
      labelKey: "NOC_PAYMENT_PAID_BY_PLACEHOLDER"
    },
    data: [
      {
        code: "COMMON_OWNER"
      },
      {
        code: "COMMON_OTHER"
      }
    ],
    jsonPath: "ReceiptTemp[0].Bill[0].payer",
    required: true
  }),
  payerName: getTextField({
    label: {
      labelName: "Payer Name",
      labelKey: "NOC_PAYMENT_PAYER_NAME_LABEL"
    },
    placeholder: {
      labelName: "Enter Payer Name",
      labelKey: "NOC_PAYMENT_PAYER_NAME_PLACEHOLDER"
    },
    jsonPath: "ReceiptTemp[0].Bill[0].paidBy",
    required: true
  }),
  payerMobileNo: getTextField({
    label: {
      labelName: "Payer Mobile No.",
      labelKey: "NOC_PAYMENT_PAYER_MOB_LABEL"
    },
    placeholder: {
      labelName: "Enter Payer Mobile No.",
      labelKey: "NOC_PAYMENT_PAYER_MOB_PLACEHOLDER"
    },
    jsonPath: "ReceiptTemp[0].Bill[0].payerMobileNumber",
    pattern: getPattern("MobileNo"),
    errorMessage: "ERR_DEFAULT_INPUT_FIELD_MSG",
    iconObj: {
      position: "start",
      label: "+91 |"
    },
    required: true
  })
});

export const onlineDetails = getCommonContainer({
  txnNo: getTextField({
    label: {
      labelName: "Transaction No.",
      labelKey: "PAYMENT_TXN_NO_LABEL"
    },
    placeholder: {
      labelName: "Enter Transaction  no.",
      labelKey: "PAYMENT_TXN_NO_PLACEHOLDER"
    },
    //Pattern validation for Cheque number
    jsonPath: "ReceiptTemp[0].instrument.transactionNumber",
    required: true
  }),
  txnDate: getDateField({
    label: {
      labelName: "Transaction Date",
      labelKey: "PAYMENT_TXN_DATE_LABEL"
    },
    placeholder: {
      labelName: "dd/mm/yy",
      labelKey: "PAYMENT_TXN_DATE_PLACEHOLDER"
    },
    pattern: getPattern("Date"),
    errorMessage: "PAYMENT_TX_ERROR_MESSAGE",
    required: true,
    isDOB: true,
    jsonPath: "ReceiptTemp[0].instrument.transactionDateInput",
    props: {
      inputProps: {
        max: getTodaysDateInYMD()
      }
    }
  }),
  onlineIFSC: getTextField({
    label: {
      labelName: "IFSC",
      labelKey: "NOC_PAYMENT_IFSC_CODE_LABEL"
    },
    placeholder: {
      labelName: "Enter bank IFSC",
      labelKey: "NOC_PAYMENT_IFSC_CODE_PLACEHOLDER"
    },
    // required: true,
    jsonPath: "ReceiptTemp[0].instrument.ifscCode",
    iconObj: {
      iconName: "search",
      position: "end",
      color: "#FE7A51",
      onClickDefination: {
        action: "condition",
        callBack: (state, dispatch) => {
          onIconClick(state, dispatch, 1);
        }
      }
    }
  }),
  chequeBank: getTextField({
    label: {
      labelName: "Bank Name",
      labelKey: "NOC_PAYMENT_BANK_NAME_LABEL"
    },
    placeholder: {
      labelName: "Enter bank name",
      labelKey: "NOC_PAYMENT_BANK_NAME_PLACEHOLDER"
    },
    required: true,
    props: {
      disabled: true
    },
    jsonPath: "ReceiptTemp[0].instrument.bank.name"
  })
});

export const chequeDetails = getCommonContainer({
  chequeNo: getTextField({
    label: {
      labelName: "Cheque No",
      labelKey: "NOC_PAYMENT_CHQ_NO_LABEL"
    },
    placeholder: {
      labelName: "Enter Cheque  no.",
      labelKey: "NOC_PAYMENT_CHQ_NO_PLACEHOLDER"
    },
    //Pattern validation for Cheque number
    jsonPath: "ReceiptTemp[0].instrument.transactionNumber",
    required: true
  }),
  chequeDate: getDateField({
    label: {
      labelName: "Cheque Date",
      labelKey: "NOC_PAYMENT_CHEQUE_DATE_LABEL"
    },
    placeholder: {
      labelName: "dd/mm/yy",
      labelKey: "NOC_PAYMENT_CHEQUE_DATE_PLACEHOLDER"
    },
    required: true,
    jsonPath: "ReceiptTemp[0].instrument.transactionDateInput"
  }),
  chequeIFSC: getTextField({
    label: {
      labelName: "IFSC",
      labelKey: "NOC_PAYMENT_IFSC_CODE_LABEL"
    },
    placeholder: {
      labelName: "Enter bank IFSC",
      labelKey: "NOC_PAYMENT_IFSC_CODE_PLACEHOLDER"
    },
    required: true,
    jsonPath: "ReceiptTemp[0].instrument.ifscCode",
    iconObj: {
      iconName: "search",
      position: "end",
      color: "#FE7A51",
      onClickDefination: {
        action: "condition",
        callBack: (state, dispatch) => {
          onIconClick(state, dispatch, 1);
        }
      }
    }
  }),
  chequeBank: getTextField({
    label: {
      labelName: "Bank Name",
      labelKey: "NOC_PAYMENT_BANK_NAME_LABEL"
    },
    placeholder: {
      labelName: "Enter bank name",
      labelKey: "NOC_PAYMENT_BANK_NAME_PLACEHOLDER"
    },
    required: true,
    props: {
      style:{"pointer-events":"none"} 
    },
    jsonPath: "ReceiptTemp[0].instrument.bank.name"
  }),
  chequeBranch: getTextField({
    label: {
      labelName: "Bank Branch",
      labelKey: "NOC_PAYMENT_BANK_BRANCH_LABEL"
    },
    placeholder: {
      labelName: "Enter bank branch",
      labelKey: "NOC_PAYMENT_BANK_BRANCH_PLACEHOLDER"
    },
    required: true,
    props: {
      style:{"pointer-events":"none"} 
    },
    jsonPath: "ReceiptTemp[0].instrument.branchName"
  })
});

export const poDetails = getCommonContainer({
  ipoNo: getTextField({
    label: {
      labelName: "IPO No.",
      labelKey: "PAYMENT_IPO_NO_LABEL"
    },
    placeholder: {
      labelName: "Enter IPO No.",
      labelKey: "PAYMENT_IPO_NO_PLACEHOLDER"
    },
    //Pattern validation for Cheque number
    jsonPath: "ReceiptTemp[0].instrument.transactionNumber",
    required: true
  }),
  txnDate: getDateField({
    label: {
      labelName: "Transaction Date",
      labelKey: "PAYMENT_TXN_DATE_LABEL"
    },
    placeholder: {
      labelName: "dd/mm/yy",
      labelKey: "PAYMENT_TXN_DATE_PLACEHOLDER"
    },
    pattern: getPattern("Date"),
    errorMessage: "PAYMENT_TX_ERROR_MESSAGE",
    isDOB: true,
    required: true,
    jsonPath: "ReceiptTemp[0].instrument.transactionDateInput",
    props: {
      inputProps: {
        max: getTodaysDateInYMD()
      }
    }
  })
});

export const cheque = getCommonContainer({
  payeeDetails,
  chequeDetails
});

export const neftRtgs = getCommonContainer({
  payeeDetails,
  onlineDetails
});

export const postalOrder = getCommonContainer({
  payeeDetails,
  poDetails
});

export const demandDraftDetails = getCommonContainer({
  ddNo: getTextField({
    label: {
      labelName: "DD No",
      labelKey: "NOC_PAYMENT_DD_NO_LABEL"
    },
    placeholder: {
      labelName: "Enter DD  no.",
      labelKey: "NOC_PAYMENT_DD_NO_PLACEHOLDER"
    },
    required: true,
    //Pattern validation for DD no.
    jsonPath: "ReceiptTemp[0].instrument.transactionNumber"
  }),
  ddDate: getDateField({
    label: { labelName: "DD Date", labelKey: "NOC_PAYMENT_DD_DATE_LABEL" },
    placeholder: {
      labelName: "dd/mm/yy",
      labelKey: "NOC_PAYMENT_DD_DATE_PLACEHOLDER"
    },
    required: true,
    jsonPath: "ReceiptTemp[0].instrument.transactionDateInput"
  }),
  ddIFSC: getTextField({
    label: {
      labelName: "IFSC",
      labelKey: "NOC_PAYMENT_IFSC_CODE_LABEL"
    },
    placeholder: {
      labelName: "Enter bank IFSC",
      labelKey: "NOC_PAYMENT_IFSC_CODE_PLACEHOLDER"
    },
    required: false,
    jsonPath: "ReceiptTemp[0].instrument.ifscCode",
    iconObj: {
      iconName: "search",
      position: "end",
      color: "#FE7A51",
      onClickDefination: {
        action: "condition",
        callBack: (state, dispatch) => {
          onIconClick(state, dispatch, 2);
        }
      }
    }
  }),
  ddBank: getTextField({
    label: {
      labelName: "Bank Name",
      labelKey: "NOC_PAYMENT_BANK_NAME_LABEL"
    },
    placeholder: {
      labelName: "Enter bank name",
      labelKey: "NOC_PAYMENT_BANK_NAME_PLACEHOLDER"
    },
    required: true,
    props: {
      disabled: true
    },
    jsonPath: "ReceiptTemp[0].instrument.bank.name"
  }),
  ddBranch: getTextField({
    label: {
      labelName: "Bank Branch",
      labelKey: "NOC_PAYMENT_BANK_BRANCH_LABEL"
    },
    placeholder: {
      labelName: "Enter bank branch",
      labelKey: "NOC_PAYMENT_BANK_BRANCH_PLACEHOLDER"
    },
    required: true,
    props: {
      disabled: true
    },
    jsonPath: "ReceiptTemp[0].instrument.branchName"
  })
});

export const demandDraft = getCommonContainer({
  payeeDetails,
  demandDraftDetails
});

export const cardDetails = getCommonContainer({
  last4Digits: getTextField({
    label: {
      labelName: "Last 4 digits",
      labelKey: "NOC_PAYMENT_CARD_LAST_DIGITS_LABEL"
    },
    placeholder: {
      labelName: "Enter Last 4 digits of the card",
      labelKey: "NOC_PAYMENT_CARD_LAST_DIGITS_LABEL_PLACEHOLDER"
    },
    required: true,
    jsonPath: "ReceiptTemp[0].instrument.instrumentNumber",
    pattern: "^([0-9]){4}$",
    errorMessage: "ERR_DEFAULT_INPUT_FIELD_MSG"
  }),
  TrxNo: getTextField({
    label: {
      labelName: "Transaction No.",
      labelKey: "NOC_PAYMENT_TRANS_NO_LABEL"
    },
    placeholder: {
      labelName: "Enter transaction no.",
      labelKey: "NOC_PAYMENT_TRANS_NO_PLACEHOLDER"
    },
    // Pattern validation for Transaction number
    required: true,
    jsonPath: "ReceiptTemp[0].instrument.transactionNumber"
  }),
  repeatTrxNo: getTextField({
    label: {
      labelName: "Re-Enter Transaction No.",
      labelKey: "NOC_PAYMENT_RENTR_TRANS_LABEL"
    },
    placeholder: {
      labelName: "Enter transaction no.",
      labelKey: "NOC_PAYMENT_TRANS_NO_PLACEHOLDER"
    },
    // Pattern validation for Transaction number
    required: true,
    jsonPath: "ReceiptTemp[0].instrument.transactionNumberConfirm"
  })
});

export const card = getCommonContainer({
  payeeDetails,
  cardDetails
});

export const cash = getCommonContainer({
  payeeDetails
});


export const paymentMethods= [
  {
    code : "CASH",
    tabButton: "COMMON_CASH",    
    tabIcon: "Dashboard",
    tabContent: { cash }
  },
  {
    code : "CHEQUE",
    tabButton: "COMMON_CHEQUE",
    tabIcon: "Schedule",
    tabContent: { cheque }
  },
  {
    code : "DD",
    tabButton: "COMMON_DD",
    tabIcon: "Schedule",
    tabContent: { demandDraft }
  },
  {
    code : "CARD",
    tabButton: "COMMON_CREDIT_DEBIT_CARD",
    tabIcon: "Schedule",
    tabContent: { card }
  },
  {
    code : "OFFLINE_NEFT",
    tabButton: "COMMON_NEFT",
    tabIcon: "Schedule",
    tabContent: { neftRtgs }
  },
  {
    code : "OFFLINE_RTGS",
    tabButton: "COMMON_RTGS",
    tabIcon: "Schedule",
    tabContent: { neftRtgs }
  },
  {
    code : "POSTAL_ORDER",
    tabButton: "COMMON_POSTAL_ORDER",
    tabIcon: "Schedule",
    tabContent: { postalOrder }
  }
]

