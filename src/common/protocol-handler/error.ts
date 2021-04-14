import Url from "url-parse";

export enum RoutingErrorType {
  INVALID_PROTOCOL = "invalid-protocol",
  INVALID_HOST = "invalid-host",
  INVALID_PATHNAME = "invalid-pathname",
  NO_HANDLER = "no-handler",
  NO_EXTENSION_ID = "no-ext-id",
  MISSING_EXTENSION = "missing-ext",
}

export class RoutingError extends Error {
  /**
   * Will be set if the routing error originated in an extension route table
   */
  public extensionName?: string;

  constructor(public type: RoutingErrorType, public url: Url) {
    super("routing error");
  }

  toString(): string {
    switch (this.type) {
      case RoutingErrorType.INVALID_HOST:
        return "invalid host";
      case RoutingErrorType.INVALID_PROTOCOL:
        return "invalid protocol";
      case RoutingErrorType.INVALID_PATHNAME:
        return "invalid pathname";
      case RoutingErrorType.NO_EXTENSION_ID:
        return "no extension ID";
      case RoutingErrorType.MISSING_EXTENSION:
        return "extension not found";
      default:
        throw new TypeError("this.type is not RoutingErrorType");
    }
  }
}
