import { CLAccountHash, CLByteArray, CLPublicKey, Keys, RuntimeArgs } from "casper-js-sdk";
import { CEP47Events } from "./constants";

export type RecipientType = CLPublicKey | CLAccountHash | CLByteArray;

export interface IPendingDeploy {
  deployHash: string;
  deployType: CEP47Events;
}

interface IClassContractCallParams {
  keys: Keys.AsymmetricKey;
  entryPoint: string;
  runtimeArgs: RuntimeArgs;
  paymentAmount: string;
  cb?: (deployHash: string) => void;
  ttl: number;
}

interface IContractCallParams {
  nodeAddress: string;
  keys: Keys.AsymmetricKey;
  chainName: string;
  entryPoint: string;
  runtimeArgs: RuntimeArgs;
  paymentAmount: string;
  contractHash: string;
  ttl: number;
}
