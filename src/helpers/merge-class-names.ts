type BaseClassList =
  | string
  | undefined
  | null
  | Record<string, boolean | string | number | null | undefined>
  | BaseClassList[];
type ClassList = BaseClassList | BaseClassList[];

export const mergeClassNames = (obj: ClassList): string | undefined => {
  if (!obj) return undefined;

  if (typeof obj === "string")
    return obj.trim() === "" ? undefined : obj.trim();

  if (Array.isArray(obj)) {
    const className = obj.map(mergeClassNames).filter(Boolean);
    return className.length === 0 ? undefined : className.join(" ");
  }

  const object2ClassName = Object.entries(obj)
    .filter(([, value]) => value)
    .map(([key]) => key.trim());

  return object2ClassName.length === 0 ? undefined : object2ClassName.join(" ");
};
