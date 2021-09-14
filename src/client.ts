// import {
//   CasperClient,
//   CLPublicKey,
//   CLAccountHash,
//   CLByteArray,
//   CLKey,
//   CLString,
//   CLTypeBuilder,
//   CLValue,
//   CLValueBuilder,
//   CLValueParsers,
//   CLMap,
//   DeployUtil,
//   EventName,
//   EventStream,
//   Keys,
//   RuntimeArgs,
// } from "casper-js-sdk";
// import { Some, None } from "ts-results";
// import { CEP47Events, DEFAULT_TTL } from "./constants";
// import * as utils from "./utils";
// import {
//   toCLMap,
//   installContract,
//   setClient,
//   contractSimpleGetter,
//   contractCallFn,
// } from "./lib";
// import { RecipientType, IPendingDeploy } from "./types";

// class Client {
//   public contractHash: string;
//   public contractPackageHash: string;
//   private namedKeys: any;
//   private isListening = false;
//   private pendingDeploys: IPendingDeploy[] = [];

//   constructor(
//     private nodeAddress: string,
//     private chainName: string,
//     private eventStreamAddress?: string
//   ) {}

//   public async installContract(
//     keys: Keys.AsymmetricKey,
//     tokenName: string,
//     tokenSymbol: string,
//     tokenMeta: Map<string, string>,
//     paymentAmount: string,
//     wasmPath: string,
//     runtimeArgs: RuntimeArgs
//   ) {
//     return await installContract(
//       this.chainName,
//       this.nodeAddress,
//       keys,
//       runtimeArgs,
//       paymentAmount,
//       wasmPath
//     );
//   }

//   public async setContractHash(hash: string) {
//     const LIST_OF_NAMED_KEYS = [
//       "balances",
//       "metadata",
//       "owned_tokens",
//       "owners",
//       "paused",
//     ];

//     const { contractPackageHash, namedKeys } = await setClient(
//       hash,
//       LIST_OF_NAMED_KEYS
//     );
//     this.contractPackageHash = contractPackageHash;
//     /* @ts-ignore */
//     this.namedKeys = namedKeys;
//   }

//   public async contractCall({
//     keys,
//     paymentAmount,
//     entryPoint,
//     runtimeArgs,
//     cb,
//     ttl = DEFAULT_TTL
//   }: any) {
//     const deployHash = await contractCallFn({
//       chainName: this.chainName,
//       contractHash: this.contractHash,
//       entryPoint,
//       paymentAmount,
//       nodeAddress: this.nodeAddress,
//       keys: keys,
//       runtimeArgs,
//       ttl,
//     });

//     if (deployHash !== null) {
//       cb && cb(deployHash);
//       return deployHash;
//     } else {
//       throw Error("Invalid Deploy");
//     }
//   }

//   public onEvent(
//     eventNames: CEP47Events[],
//     callback: (
//       eventName: CEP47Events,
//       deployStatus: {
//         deployHash: string;
//         success: boolean;
//         error: string | null;
//       },
//       result: any | null
//     ) => void
//   ): any {
//     if (!this.eventStreamAddress) {
//       throw Error("Please set eventStreamAddress before!");
//     }
//     if (this.isListening) {
//       throw Error(
//         "Only one event listener can be create at a time. Remove the previous one and start new."
//       );
//     }
//     const es = new EventStream(this.eventStreamAddress);
//     this.isListening = true;

//     es.subscribe(EventName.DeployProcessed, (value: any) => {
//       const deployHash = value.body.DeployProcessed.deploy_hash;

//       const pendingDeploy = this.pendingDeploys.find(
//         (pending) => pending.deployHash === deployHash
//       );

//       if (!pendingDeploy) {
//         return;
//       }

//       const parsedEvent = utils.parseEvent(
//         { contractPackageHash: this.contractPackageHash, eventNames },
//         value
//       );

//       if (parsedEvent.error !== null) {
//         callback(
//           pendingDeploy.deployType,
//           {
//             deployHash,
//             error: parsedEvent.error,
//             success: false,
//           },
//           null
//         );
//       } else {
//         parsedEvent.data.forEach((d: any) =>
//           callback(
//             d.name,
//             { deployHash, error: null, success: true },
//             d.clValue
//           )
//         );
//       }

//       this.pendingDeploys = this.pendingDeploys.filter(
//         (pending) => pending.deployHash !== deployHash
//       );
//     });

//     es.start();

//     return {
//       stopListening: () => {
//         es.unsubscribe(EventName.DeployProcessed);
//         es.stop();
//         this.isListening = false;
//         this.pendingDeploys = [];
//       },
//     };
//   }

//   private addPendingDeploy(deployType: CEP47Events, deployHash: string) {
//     this.pendingDeploys = [...this.pendingDeploys, { deployHash, deployType }];
//   }
// }

// export default CEP47Client;
