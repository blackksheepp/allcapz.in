import prisma from "@/lib/prisma";
export interface CollectionType {
  name: string;
  products: ProductType[];
}

export interface ProductType {
  image: string;
  title: string;
  price: number;
  size: string;
}

export const createCollection = async (name: string) => {
  try {
    await prisma.collections.create({
      data: {
        name: name,
        products: [],
      },
    });
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const getCollections = async () => {
  try {
    return await prisma.collections.findMany({});
  } catch (error) {
    return null;
  }
};

export const delCollection = async (name: string) => {
  try {
    await prisma.collections.delete({
      where: {
        name: name,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

export const renameCollection = async (
  oldCollectionName: string,
  newCollectionName: string
) => {
  try {
    await prisma.collections.update({
      where: {
        name: oldCollectionName,
      },
      data: {
        name: newCollectionName,
      },
    });

    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const reOrderCollections = async (collections: CollectionType[]) => {
  try {
    await prisma.collections.deleteMany({});
    await prisma.collections.createMany({
      data: [...collections],
    });
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const createProduct = async (
  title: string,
  image: string,
  price: number,
  size: string,
  collection: string
) => {
  try {
    await prisma.collections.update({
      where: {
        name: collection,
      },
      data: {
        products: {
          push: [
            {
              image: image,
              title: title,
              price: price,
              size: size,
            },
          ],
        },
      },
    });
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const getProducts = async (collection: string) => {
  try {
    const c = await prisma.collections.findFirst({
      where: {
        name: collection,
      },
    });
    return c ? c.products : null;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const delProduct = async (collection: string, title: string) => {
  try {
    const products = (
      await prisma.collections.findFirst({
        where: {
          name: collection,
        },
      })
    )?.products;

    const product = (products?.filter((product) => product.title == title))![0];

    await prisma.collections.update({
      where: {
        name: collection,
      },
      data: {
        products: {
          set: products?.filter((product) => product.title != title),
        },
      },
    });
  } catch (error) {
    console.log(error);
  }
};

export const renameProduct = async (
  collection: string,
  oldProductTitle: string,
  newProductTitle: string
) => {
  try {
    var products = (
      await prisma.collections.findFirst({
        where: {
          name: collection,
        },
      })
    )?.products;
    products = products?.map((product) => {
      return product.title != oldProductTitle
        ? product
        : {
            image: product.image,
            title: newProductTitle,
            price: product.price,
            size: product.size,
          };
    });
    await prisma.collections.update({
      where: {
        name: collection,
      },
      data: {
        products: {
          set: products,
        },
      },
    });
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const reOrderProduct = async (collection: string, products: ProductType[]) => {
  try {
    await prisma.collections.update({
      where: {
        name: collection,
      },
      data: {
        products: {
          set: products,
        },
      },
    });
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};
export const reOrder = async (
  objects: (CollectionType | ProductType)[],
  collection: string | false
) => {
  if (collection) {
    return await reOrderProduct(collection, objects as ProductType[]);
  } else {
    return await reOrderCollections(objects as CollectionType[]);
  }
};

export const getProductByTitle = async (collection: string, title: string) => {
  try {
    const c = await prisma.collections.findFirst({
      where: {
        name: collection,
      },
    });
    let i: ProductType[] | undefined = c?.products.filter((i) => i.title == title);
    let product = i?.at(0);
    return product ? product : null;
  } catch (error) {
    console.log(error);
    return null;
  }
};
