const fs = require("fs");
const path = require("path");

// Configurations
const eslintConfig = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: ["eslint:recommended", "plugin:prettier/recommended"],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  rules: {
    "prettier/prettier": "error",
    "no-unused-vars": "warn",
    "no-console": "off",
  },
};

const prettierConfig = {
  semi: true,
  singleQuote: false,
  tabWidth: 2,
  trailingComma: "es5",
  printWidth: 80,
};

const eslintIgnore = `node_modules/
dist/
build/
coverage/
`;

const prettierIgnore = `node_modules/
dist/
build/
coverage/
package-lock.json
`;

// File paths
const files = {
  ".eslintrc.json": JSON.stringify(eslintConfig, null, 2),
  ".prettierrc": JSON.stringify(prettierConfig, null, 2),
  ".eslintignore": eslintIgnore,
  ".prettierignore": prettierIgnore,
};

// Create the files
Object.entries(files).forEach(([fileName, content]) => {
  const filePath = path.join(__dirname, fileName);
  fs.writeFileSync(filePath, content, "utf8");
  console.log(`✅ Created ${fileName}`);
});

console.log("🎉 ESLint & Prettier setup completed!");
