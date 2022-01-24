interface IPaciente {
    addMedico(medico: IMedico);
    getDiagnostico(): string;
    getNome(): string;
    getMedicos(): Array<string>;
    getMedEspec():Array<IMedico>;
    removerMedico(nome: string);
}

interface IMedico {
    addPaciente(paciente: IPaciente);
    getEspecialidade(): string;
    getNome(): string;
    getPacientes(): Array<string>;
    removerPaciente(nome: string);
}

class Paciente implements IPaciente{
    private medicos: Map<string, IMedico>;
    constructor(private nome: string, private diagnostico: string){
        this.medicos = new Map<string, IMedico>();
    }

    public getNome(): string {
        return this.nome;
    }
    public getDiagnostico(){
        return this.diagnostico;
    }
    public getMedicos(){
        return [...this.medicos.keys()];
    }
    public getMedEspec(){
        return [...this.medicos.values()];
    }

    public addMedico(medico: IMedico){
        let chave = medico.getNome();
        if (this.medicos.has(chave))
            return;
        // else if(this.diagnostico !== medico.getEspecialidade())
        //     return
        for(let med of this.medicos.values()){
            if(medico.getEspecialidade() == med.getEspecialidade()){
                // console.log("O paciente já tem médico na especialidade.");
                return;
            }
        }
        
        this.medicos.set(chave, medico);
        medico.addPaciente(this);
    }

    public removerMedico(key: string): void {
        let medico: undefined | IMedico = this.medicos.get(key);
        if (medico !== undefined) {
            this.medicos.delete(key);
            medico.removerPaciente(this.nome);
        }
    }

    public toString(): string {
        let keys = this.medicos.keys();
        return this.nome + ":"+ this.diagnostico +" [" + [...keys].join(", ") + "]";
    }
}

class Medico{
    private pacientes: Map<string, IPaciente>;
    constructor(private nome: string, private especialidade: string){
        this.pacientes = new Map<string, IPaciente>();
    }

    public getNome(): string {
        return this.nome;
    }
    public getEspecialidade(){
        return this.especialidade;
    }
    public getPacientes(){
        return [...this.pacientes.keys()];
    }

    public addPaciente(paciente: IPaciente){
        let chave = paciente.getNome();
        if (this.pacientes.has(chave))
            return;
        // else if(this.especialidade !== paciente.getDiagnostico())
        //     return
        for(let med of paciente.getMedEspec()){
            if(this.especialidade == med.getEspecialidade()){
                // console.log(this.especialidade+":"+med.getEspecialidade());
                // console.log("O paciente já tem médico na especialidade.");
                if(this.nome !== med.getNome())
                    return;
            }
        }

        this.pacientes.set(chave, paciente);
        paciente.addMedico(this);
    }

    public removerPaciente(key: string): void {
        let paciente: undefined | IPaciente = this.pacientes.get(key);
        if (paciente !== undefined) {
            this.pacientes.delete(key);
            paciente.removerMedico(this.nome);
        }
    }

    public toString(): string {
        let keys = this.pacientes.keys();
        return this.nome + ":"+ this.especialidade +" [" + [...keys].join(", ") + "]";
    }
}

class Hospital{
    private pacientes: Map<string, IPaciente>;
    private medicos: Map<string, IMedico>;
    constructor(){
        this.pacientes = new Map<string, IPaciente>();
        this.medicos = new Map<string, IMedico>();
    }

    public addPaciente(paciente: IPaciente): void {
        let chave = paciente.getNome();
        if (this.pacientes.has(chave))
            return;
        this.pacientes.set(chave, paciente);
    }

    public addMedico(medico: IMedico): void {
        let chave = medico.getNome();
        if (this.medicos.has(chave))
            return;
        this.medicos.set(chave, medico);
    }

    public getPaciente(nome: string): IPaciente {
        let paciente: undefined | IPaciente = this.pacientes.get(nome);
        if (paciente === undefined)
            throw new Error("Paciente não encontrado");
        return paciente;
    }

    public getMedico(nome: string): IMedico {
        let medico: undefined | IMedico =  this.medicos.get(nome);
        if (medico === undefined)
            throw new Error("Medico não encontrada");
        return medico;
    }

    public removerPaciente(nome: string): void {
        let paciente = this.getPaciente(nome);
        for (let medc of paciente.getMedicos()) {
            paciente.removerMedico(medc);
        }
        this.pacientes.delete(nome);
    }

    public removerMedico(nome: string): void {
        let medico = this.getMedico(nome);

        for (let paciente of medico.getPacientes()) {
            medico.removerPaciente(paciente);
        }

        this.medicos.delete(nome);
    }

    public vincular(nome_paciente: string, nome_medico: string): void {
        let paciente = this.getPaciente(nome_paciente);
        let medc = this.getMedico(nome_medico);
        paciente.addMedico(medc);
    }

    public desvincular(nome_paciente: string, nome_medico: string): void {
        this.getPaciente(nome_paciente).removerMedico(nome_medico);
    }

    public toString(): string {
        let pacientes = [...this.pacientes.values()].map(a => a.toString());
        let medic = [...this.medicos.values()].map(d => d.toString());
        return "--Pacientes:\n" + pacientes.join("\n") + "\n--Médicos:\n" + medic.join("\n");
    }
}

let hosp = new Hospital();
hosp.addPaciente(new Paciente("Joao","Cirurgia"));
hosp.addPaciente(new Paciente("Maria","Pediatria"));
hosp.addPaciente(new Paciente("Pedro","Pediatria"));

hosp.addMedico(new Medico("Rosana","Cirurgia"));
hosp.addMedico(new Medico("Gutemberg","Cirurgia"));
hosp.addMedico(new Medico("Jonas","Pediatria"));

hosp.vincular("Joao", "Rosana");
hosp.vincular("Maria", "Jonas");
hosp.vincular("Maria", "Rosana");
hosp.vincular("Maria", "Gutemberg");
hosp.vincular("Pedro", "Rosana");

console.log(hosp.toString());

hosp.removerMedico("Gutemberg");

console.log(hosp.toString());