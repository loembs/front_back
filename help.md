# Déclaration d'une variable et d'un attribut de classe
  Variable : Type
  Attribut d'une classe doit toujours être initialisé
  eg : private title: string; !!! ERROR !!!
  ================= CORRECTION =================
  private title: string = 'Catalogue'; !!! OK !!!
  private title?: string; !!! OK !!! ==> ? private title: string | undefined = undefined ; !!! OK !!!
  private title: string | null = null; !!! OK !!!

# ================= TYPES DE TYPESCRIPT =================
  
  string
  number ==> integer, float
  boolean
  any ==> type dynamique (var en javascript) (à éviter !!!)
  void
  null 
  undefined  ==> variable non définie
  never ==> type de retour d'une fonction qui ne retourne jamais
    exemple :
    => cas de controle de saisie (nom et prénom)

    function checkName(name: string): string | never {
      if (name === '') {
        return ; (never)
      }
      return name;
    }
    
    function throwError(message: string): never {
      throw new Error(message);
    }

  object ==> tout ce qui n'est pas un type primitif { name: 'toto', age: 25 }

  Array ==> tableau de type Array<string> ou string[] ou Array<string | number> ou (string | number)[]
    exemple : Array<string | number> ou (string | number)[]
    exemple : let names: Array<string> = ['toto', 'titi'];

  Tuple ==> tableau de taille fixe avec des types différents [string, number]
    exemple : let tuple: [string, number] = ['toto', 25];
  Enum ==> liste de valeurs possibles
    exemple : enum Color { Red, Green, Blue }

  Interface (vraiment très important) ==> définit une structure de données
    exemple :
      interface Person {
        name: string;
        age: number;
      }
      let person: Person = { name: 'toto', age: 25 }; // Pas d'instantiation (pas de new)
  
  Class ==> class Person { name: string; age: number; }

    exemple :
      syntaxe 1 :
      class Person {
          name: string; // propriété public par défaut
          private age: number; // propriété privée

          constructor( name: string, age: number) {
            this.name = name;
            this.age = age;
          }
        }

        Le this est obligatoire pour accéder aux propriétés de la classe

      syntaxe 2 :
      class Person {

        constructor(public name: string, public age: number) {
          this.name = name;
          this.age = age;
        }
      }
      let person: Person = new Person('toto', 25); // Instantiation (new)

  // Différence entre interface et class
    // Interface : définit une structure de données
    // Class : définit une structure de données et des méthodes
    // Interface : pas de constructeur
    // Class : constructeur et méthodes
    // Interface : pas de propriétés statiques
    // Class : propriétés statiques
    // Interface : pas d'héritage
    // Class : héritage
    // Interface : pas d'implémentation
    // Class : implémentation
    // Interface : pas de visibilité
    // Class : visibilité
    // Interface : pas de getter/setter
    // Class : getter/setter
    // Interface : pas de surcharge
    // Class : surcharge
    // Interface : pas d'instanciaion
    // Class : instanciation

  Function


  */