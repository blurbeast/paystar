import { Buffer } from "buffer";
import { Address } from '@stellar/stellar-sdk';
import {
  AssembledTransaction,
  Client as ContractClient,
  ClientOptions as ContractClientOptions,
  MethodOptions,
  Result,
  Spec as ContractSpec,
} from '@stellar/stellar-sdk/contract';
import type {
  u32,
  i32,
  u64,
  i64,
  u128,
  i128,
  u256,
  i256,
  Option,
  Typepoint,
  Duration,
} from '@stellar/stellar-sdk/contract';
export * from '@stellar/stellar-sdk'
export * as contract from '@stellar/stellar-sdk/contract'
export * as rpc from '@stellar/stellar-sdk/rpc'

if (typeof window !== 'undefined') {
  //@ts-ignore Buffer exists
  window.Buffer = window.Buffer || Buffer;
}


export const networks = {
  testnet: {
    networkPassphrase: "Test SDF Network ; September 2015",
    contractId: "CADFMB4OH4WC7RMDDWE3QYYYLWVQPCMTYBDW4FLQB5S7JY4AE3TJHNDY",
  }
} as const

export const ContractError = {
  1: {message:"AlreadyInstantiated"},
  2: {message:"InvalidAmount"},
  3: {message:"DuplicateUsers"},
  4: {message:"ArbitratorNotAllowed"},
  5: {message:"InvalidTimestamp"},
  6: {message:"InvalidAgreementId"},
  7: {message:"NotAuthorized"},
  8: {message:"AgreementNotFOund"}
}


export interface PaidHistory {
  amount: u128;
  timeline: u64;
}


export interface InstallmentAgreement {
  amount_paid: u128;
  arbitrator: string;
  buyer: string;
  deadline: u64;
  description: string;
  id: u128;
  is_accepted: boolean;
  is_canceled: boolean;
  is_finalized: boolean;
  paid_history: Array<PaidHistory>;
  seller: string;
  token: string;
  total_amount: u128;
}

export interface Client {
  /**
   * Construct and simulate a initialize transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   */
  initialize: ({admin}: {admin: string}, options?: {
    /**
     * The fee to pay for the transaction. Default: BASE_FEE
     */
    fee?: number;

    /**
     * The maximum amount of time to wait for the transaction to complete. Default: DEFAULT_TIMEOUT
     */
    timeoutInSeconds?: number;

    /**
     * Whether to automatically simulate the transaction when constructing the AssembledTransaction. Default: true
     */
    simulate?: boolean;
  }) => Promise<AssembledTransaction<Result<string>>>

  /**
   * Construct and simulate a create_installment_agreement transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   */
  create_installment_agreement: ({seller, buyer, amount, deadline, arbitrator, token, description}: {seller: string, buyer: string, amount: u128, deadline: u64, arbitrator: string, token: string, description: string}, options?: {
    /**
     * The fee to pay for the transaction. Default: BASE_FEE
     */
    fee?: number;

    /**
     * The maximum amount of time to wait for the transaction to complete. Default: DEFAULT_TIMEOUT
     */
    timeoutInSeconds?: number;

    /**
     * Whether to automatically simulate the transaction when constructing the AssembledTransaction. Default: true
     */
    simulate?: boolean;
  }) => Promise<AssembledTransaction<Result<boolean>>>

  /**
   * Construct and simulate a pay_on_installment transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   */
  pay_on_installment: ({buyer_address, installment_amount, agreement_id}: {buyer_address: string, installment_amount: u128, agreement_id: u128}, options?: {
    /**
     * The fee to pay for the transaction. Default: BASE_FEE
     */
    fee?: number;

    /**
     * The maximum amount of time to wait for the transaction to complete. Default: DEFAULT_TIMEOUT
     */
    timeoutInSeconds?: number;

    /**
     * Whether to automatically simulate the transaction when constructing the AssembledTransaction. Default: true
     */
    simulate?: boolean;
  }) => Promise<AssembledTransaction<Result<boolean>>>

  /**
   * Construct and simulate a finalize_agreement transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   */
  finalize_agreement: ({agreement_id, user}: {agreement_id: u128, user: string}, options?: {
    /**
     * The fee to pay for the transaction. Default: BASE_FEE
     */
    fee?: number;

    /**
     * The maximum amount of time to wait for the transaction to complete. Default: DEFAULT_TIMEOUT
     */
    timeoutInSeconds?: number;

    /**
     * Whether to automatically simulate the transaction when constructing the AssembledTransaction. Default: true
     */
    simulate?: boolean;
  }) => Promise<AssembledTransaction<Result<boolean>>>

  /**
   * Construct and simulate a accept_installment_agreement transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   */
  accept_installment_agreement: ({seller, accept_agreement, agreement_id}: {seller: string, accept_agreement: boolean, agreement_id: u128}, options?: {
    /**
     * The fee to pay for the transaction. Default: BASE_FEE
     */
    fee?: number;

    /**
     * The maximum amount of time to wait for the transaction to complete. Default: DEFAULT_TIMEOUT
     */
    timeoutInSeconds?: number;

    /**
     * Whether to automatically simulate the transaction when constructing the AssembledTransaction. Default: true
     */
    simulate?: boolean;
  }) => Promise<AssembledTransaction<Result<boolean>>>

  /**
   * Construct and simulate a cancel_and_refund_agreement transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   */
  cancel_and_refund_agreement: ({address, agreement_id}: {address: string, agreement_id: u128}, options?: {
    /**
     * The fee to pay for the transaction. Default: BASE_FEE
     */
    fee?: number;

    /**
     * The maximum amount of time to wait for the transaction to complete. Default: DEFAULT_TIMEOUT
     */
    timeoutInSeconds?: number;

    /**
     * Whether to automatically simulate the transaction when constructing the AssembledTransaction. Default: true
     */
    simulate?: boolean;
  }) => Promise<AssembledTransaction<Result<boolean>>>

  /**
   * Construct and simulate a get_installment_agreement transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   */
  get_installment_agreement: ({agreement_id}: {agreement_id: u128}, options?: {
    /**
     * The fee to pay for the transaction. Default: BASE_FEE
     */
    fee?: number;

    /**
     * The maximum amount of time to wait for the transaction to complete. Default: DEFAULT_TIMEOUT
     */
    timeoutInSeconds?: number;

    /**
     * Whether to automatically simulate the transaction when constructing the AssembledTransaction. Default: true
     */
    simulate?: boolean;
  }) => Promise<AssembledTransaction<Option<InstallmentAgreement>>>

}
export class Client extends ContractClient {
  static async deploy<T = Client>(
    /** Options for initializing a Client as well as for calling a method, with extras specific to deploying. */
    options: MethodOptions &
      Omit<ContractClientOptions, "contractId"> & {
        /** The hash of the Wasm blob, which must already be installed on-chain. */
        wasmHash: Buffer | string;
        /** Salt used to generate the contract's ID. Passed through to {@link Operation.createCustomContract}. Default: random. */
        salt?: Buffer | Uint8Array;
        /** The format used to decode `wasmHash`, if it's provided as a string. */
        format?: "hex" | "base64";
      }
  ): Promise<AssembledTransaction<T>> {
    return ContractClient.deploy(null, options)
  }
  constructor(public readonly options: ContractClientOptions) {
    super(
      new ContractSpec([ "AAAABAAAAAAAAAAAAAAADUNvbnRyYWN0RXJyb3IAAAAAAAAIAAAAAAAAABNBbHJlYWR5SW5zdGFudGlhdGVkAAAAAAEAAAAAAAAADUludmFsaWRBbW91bnQAAAAAAAACAAAAAAAAAA5EdXBsaWNhdGVVc2VycwAAAAAAAwAAAAAAAAAUQXJiaXRyYXRvck5vdEFsbG93ZWQAAAAEAAAAAAAAABBJbnZhbGlkVGltZXN0YW1wAAAABQAAAAAAAAASSW52YWxpZEFncmVlbWVudElkAAAAAAAGAAAAAAAAAA1Ob3RBdXRob3JpemVkAAAAAAAABwAAAAAAAAARQWdyZWVtZW50Tm90Rk91bmQAAAAAAAAI",
        "AAAAAQAAAAAAAAAAAAAAC1BhaWRIaXN0b3J5AAAAAAIAAAAAAAAABmFtb3VudAAAAAAACgAAAAAAAAAIdGltZWxpbmUAAAAG",
        "AAAAAQAAAAAAAAAAAAAAFEluc3RhbGxtZW50QWdyZWVtZW50AAAADQAAAAAAAAALYW1vdW50X3BhaWQAAAAACgAAAAAAAAAKYXJiaXRyYXRvcgAAAAAAEwAAAAAAAAAFYnV5ZXIAAAAAAAATAAAAAAAAAAhkZWFkbGluZQAAAAYAAAAAAAAAC2Rlc2NyaXB0aW9uAAAAABAAAAAAAAAAAmlkAAAAAAAKAAAAAAAAAAtpc19hY2NlcHRlZAAAAAABAAAAAAAAAAtpc19jYW5jZWxlZAAAAAABAAAAAAAAAAxpc19maW5hbGl6ZWQAAAABAAAAAAAAAAxwYWlkX2hpc3RvcnkAAAPqAAAH0AAAAAtQYWlkSGlzdG9yeQAAAAAAAAAABnNlbGxlcgAAAAAAEwAAAAAAAAAFdG9rZW4AAAAAAAATAAAAAAAAAAx0b3RhbF9hbW91bnQAAAAK",
        "AAAAAAAAAAAAAAAKaW5pdGlhbGl6ZQAAAAAAAQAAAAAAAAAFYWRtaW4AAAAAAAATAAAAAQAAA+kAAAATAAAH0AAAAA1Db250cmFjdEVycm9yAAAA",
        "AAAAAAAAAAAAAAAcY3JlYXRlX2luc3RhbGxtZW50X2FncmVlbWVudAAAAAcAAAAAAAAABnNlbGxlcgAAAAAAEwAAAAAAAAAFYnV5ZXIAAAAAAAATAAAAAAAAAAZhbW91bnQAAAAAAAoAAAAAAAAACGRlYWRsaW5lAAAABgAAAAAAAAAKYXJiaXRyYXRvcgAAAAAAEwAAAAAAAAAFdG9rZW4AAAAAAAATAAAAAAAAAAtkZXNjcmlwdGlvbgAAAAAQAAAAAQAAA+kAAAABAAAH0AAAAA1Db250cmFjdEVycm9yAAAA",
        "AAAAAAAAAAAAAAAScGF5X29uX2luc3RhbGxtZW50AAAAAAADAAAAAAAAAA1idXllcl9hZGRyZXNzAAAAAAAAEwAAAAAAAAASaW5zdGFsbG1lbnRfYW1vdW50AAAAAAAKAAAAAAAAAAxhZ3JlZW1lbnRfaWQAAAAKAAAAAQAAA+kAAAABAAAH0AAAAA1Db250cmFjdEVycm9yAAAA",
        "AAAAAAAAAAAAAAASZmluYWxpemVfYWdyZWVtZW50AAAAAAACAAAAAAAAAAxhZ3JlZW1lbnRfaWQAAAAKAAAAAAAAAAR1c2VyAAAAEwAAAAEAAAPpAAAAAQAAB9AAAAANQ29udHJhY3RFcnJvcgAAAA==",
        "AAAAAAAAAAAAAAAcYWNjZXB0X2luc3RhbGxtZW50X2FncmVlbWVudAAAAAMAAAAAAAAABnNlbGxlcgAAAAAAEwAAAAAAAAAQYWNjZXB0X2FncmVlbWVudAAAAAEAAAAAAAAADGFncmVlbWVudF9pZAAAAAoAAAABAAAD6QAAAAEAAAfQAAAADUNvbnRyYWN0RXJyb3IAAAA=",
        "AAAAAAAAAAAAAAAbY2FuY2VsX2FuZF9yZWZ1bmRfYWdyZWVtZW50AAAAAAIAAAAAAAAAB2FkZHJlc3MAAAAAEwAAAAAAAAAMYWdyZWVtZW50X2lkAAAACgAAAAEAAAPpAAAAAQAAB9AAAAANQ29udHJhY3RFcnJvcgAAAA==",
        "AAAAAAAAAAAAAAAZZ2V0X2luc3RhbGxtZW50X2FncmVlbWVudAAAAAAAAAEAAAAAAAAADGFncmVlbWVudF9pZAAAAAoAAAABAAAD6AAAB9AAAAAUSW5zdGFsbG1lbnRBZ3JlZW1lbnQ=" ]),
      options
    )
  }
  public readonly fromJSON = {
    initialize: this.txFromJSON<Result<string>>,
        create_installment_agreement: this.txFromJSON<Result<boolean>>,
        pay_on_installment: this.txFromJSON<Result<boolean>>,
        finalize_agreement: this.txFromJSON<Result<boolean>>,
        accept_installment_agreement: this.txFromJSON<Result<boolean>>,
        cancel_and_refund_agreement: this.txFromJSON<Result<boolean>>,
        get_installment_agreement: this.txFromJSON<Option<InstallmentAgreement>>
  }
}