with import <nixpkgs> {};
 
stdenv.mkDerivation {
    name = "csb";
    buildInputs = [
        nodejs_18
    ];
    shellHook = ''
        node --version
    '';
}