export class Constant {
  public static uriToIgnore = [
    "/users",
    "/auth/login",
    "/auth/refresh-token",
    "/auth/forgot-password",
    "/auth/activate",
    "/auth/request-new-otp",
    "/auth/reset-password",
  ];

  public static prefixErrorMessage = "Erreur :";

  public static endpointCategorieProduit = "/categorie-produits";
  public static endpointPost = "post";
  public static endpointGet = "get";
  public static endpointPut = "put";
  public static endpointDelete = "delete";
  public static paramsIsTopCategorie = "isTopCategory=";
  public static paramsAnd = "&";
  public static paramsQuestions = "?";
  public static paramsEqual = "=";
}

export enum HttpMethod {
  GET = "get",
  POST = "post",
  PUT = "put",
  DELETE = "delete",
  PATCH = "patch",
}

export enum MySize {
  small = "small",
  medium = "medium",
  large = "large",
}
