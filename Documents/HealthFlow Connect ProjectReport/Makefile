name=main
all: $(name)

$(name): $(name).tex
	latex $(name)
	bibtex $(name)
	latex $(name)
	latex $(name)
	dvipdf $(name).dvi

clean:
	rm *.aux
	rm *.log
	rm *.lot
	rm *.toc
	rm *.lof
	rm *.bbl
	rm *.dvi