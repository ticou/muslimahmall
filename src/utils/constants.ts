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
  public static typeMarchand = "MARCHAND";
  public static typeClient = "CLIENT";

  public static endpointCategorieProduit = "/categorie-produits";
  public static endpointProduit = "/product";
  public static endpointShops = "/shops";

  public static paramsIsTopCategorie = "isTopCategory=";
  public static paramsName = "name=";
  public static paramsShopId = "shopId=";
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

export enum SizeLoader {
  small = "small",
  medium = "medium",
  large = "large",
}
