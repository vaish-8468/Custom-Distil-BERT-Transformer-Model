
#   Custom BERT based Transformer Model

This is a BERT based Transformer Model that is state of the art for learning contextual information from textual data and generate textual responses for prompts posed to it. We took a pre trained BERT-base case model and then fine tuned it on our custom dataset, [SQuAD](https://paperswithcode.com/dataset/squad) (Stanford Question Answering Dataset). We were able to achieve an accuracy above 96% with a CPU Wall time of around 70 Milliseconds.




## Authors

- [Aryan](https://www.github.com/aryannewyork)
- [Aashray Gupta](https://www.github.com/aashraygupta2003)
- [Sourav Saini](https://www/github.com/Sourav0118)
- [Vartika Vaish](https://www.github.com/vaish-8468)


## Deployment

To deploy this project run the training and main notebooks, by correctly mounting the drive with dataset.

- The links for the NoteBooks can be found here:


    [Main Notebook](https://colab.research.google.com/drive/1EJXG3yMdHdV1g0IYnZxr3iTIwSLdCxb4?usp=sharing)

    [Inference Notebook](https://colab.research.google.com/drive/1vbAoMMevk7sli7s-DlmTVmwagYgnra0m?usp=sharing)

    [Model Drive link](https://drive.google.com/file/d/1-3QDzZdNJcv5odoNpwAFw8ieEm1tJscn/view?usp=sharing)


## Statistics 

- Initial Model

![InitialModel](https://github.com/aryannewyork/CELO-Charity/assets/79625246/348adfc4-6c4a-4969-9dc6-a78068e1f1e3)

- Trained Model 1 with number of attention heads (n_heads) = 12

![Model1](https://github.com/aryannewyork/CELO-Charity/assets/79625246/69591220-defd-47a5-8199-976f02e01174)

- Trained Model 2 with number of attention heads (n_heads) = 8

![Model2](https://github.com/aryannewyork/Custom-BERT/assets/79625246/b8c4bb08-8d12-47a2-ae6f-0419c255b931)

- Training Loss

![loss](https://github.com/aryannewyork/Custom-BERT/assets/79625246/1fa05639-9941-45b0-8225-d9ce1172ced0)


### NOTE:
- More detailed analysis/information of our implemented model and strategy can be looked at in the ```report.pdf``` and ```presentation.pptx```
