class Perceptron {
    constructor() {
        this.weights = [-2,-2,4];
        this.bias = -5; // Bias inicializado com um valor aleatório
        // for (let i = 0; i < inputSize; i++) {
        //     this.weights[i] = Math.random(); // Pesos inicializados com valores aleatórios
        // }
    }

    // Função de ativação (step function)
    activationFunction(sum) {
        return sum >= 0 ? 1 : 0;
    }

    // Função de predição
    predict(inputs) {
        let sum = 0;
        for (let i = 0; i < this.weights.length; i++) {
            sum += inputs[i] * this.weights[i];
        }
        sum += this.bias;
        return this.activationFunction(sum);
    }

    // Treinamento do perceptron usando o algoritmo de aprendizado perceptron
    train(trainingInputs, labels, learningRate, epochs) {
        for (let epoch = 0; epoch < epochs; epoch++) {
            for (let i = 0; i < trainingInputs.length; i++) {
                const prediction = this.predict(trainingInputs[i]);
                const error = labels[i] - prediction;
                // Atualização dos pesos
                for (let j = 0; j < this.weights.length; j++) {
                    this.weights[j] += learningRate * error * trainingInputs[i][j];
                }
                // Atualização do bias
                this.bias += learningRate * error;
            }
        }
    }
}

// Exemplo de uso
const perceptron = new Perceptron(); // Criando um perceptron com três entradas
const trainingInputs = [
    [0, 0, 0], // Não está chovendo, não tem companhia, não é perto de casa
    [0, 1, 1], // Não está chovendo, tem companhia, é perto de casa
    [1, 0, 1], // Está chovendo, não tem companhia, é perto de casa
    [1, 1, 0]  // Está chovendo, tem companhia, não é perto de casa
]; // Dados de treinamento
const labels = [1, 1, 0, 0]; // Saídas esperadas (1 para sair, 0 para não sair)
const learningRate = 0.1; // Taxa de aprendizado
const epochs = 100; // Número de épocas de treinamento

// Treinamento do perceptron
perceptron.train(trainingInputs, labels, learningRate, epochs);

// Testando o perceptron treinado
console.log("Sair de casa se chover, tiver companhia e for perto de casa:", perceptron.predict([1, 1, 1])); // Saída esperada: 1 (sair)
console.log("Sair de casa se não chover, tiver companhia e for perto de casa:", perceptron.predict([0, 1, 1])); // Saída esperada: 1 (sair)
console.log("Sair de casa se chover, não tiver companhia e for perto de casa:", perceptron.predict([1, 0, 1])); // Saída esperada: 0 (não sair)
console.log("Sair de casa se não chover, tiver companhia e não for perto de casa:", perceptron.predict([0, 1, 0])); // Saída esperada: 0 (não sair)
