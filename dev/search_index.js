var documenterSearchIndex = {"docs":
[{"location":"#FeedbackParticleFilters.jl-1","page":"Home","title":"FeedbackParticleFilters.jl","text":"","category":"section"},{"location":"#","page":"Home","title":"Home","text":"A package for using feedback particle filters in nonlinear stochastic filtering and data assimilation problems.","category":"page"},{"location":"#","page":"Home","title":"Home","text":"Pages = [\n \"getting_started.md\",\n]\nDepth = 1","category":"page"},{"location":"#What-are-feedback-particle-filters?-1","page":"Home","title":"What are feedback particle filters?","text":"","category":"section"},{"location":"#","page":"Home","title":"Home","text":"Feedback particle filters (FPFs) are a class of sample-based numerical algorithms to approximate the conditional distribution in a nonlinear filtering problem. In contrast to conventional particle filters, which use importance weights, FPFs use feedback control to let the observations guide the particles to the appropriate position.","category":"page"},{"location":"#","page":"Home","title":"Home","text":"Further background reading:","category":"page"},{"location":"#","page":"Home","title":"Home","text":"Pages = [\n \"filtering.md\",\n \"fpf.md\",\n]\nDepth = 1","category":"page"},{"location":"#Package-features-1","page":"Home","title":"Package features","text":"","category":"section"},{"location":"#","page":"Home","title":"Home","text":"This package's aim is to provide a versatile and efficient feedback particle filter implementation in Julia, with abstractions to flexibly construct, run, and analyze feedback particle filters for a variety of uni- and multivariate filtering problems with both diffusion and point process observations.","category":"page"},{"location":"#","page":"Home","title":"Home","text":"In particular, the following features are planned to be implemented in FeedbackParticleFilters:","category":"page"},{"location":"#","page":"Home","title":"Home","text":"Types for hidden state and observation models: diffusions, Poisson processes, etc.\nA variety of gain estimation methods\nAutomatic filter deployment and simulation of the state and filtering equations\nStoring of intermediate (trajectory) data from simulation\nAn interface to the powerful solvers from the DifferentialEquations package ","category":"page"},{"location":"getting_started/#Getting-started-1","page":"Getting started","title":"Getting started","text":"","category":"section"},{"location":"getting_started/#Installation-1","page":"Getting started","title":"Installation","text":"","category":"section"},{"location":"getting_started/#","page":"Getting started","title":"Getting started","text":"Use the built-in package manager:","category":"page"},{"location":"getting_started/#","page":"Getting started","title":"Getting started","text":"using Pkg\nPkg.add(\"FeedbackParticleFilters\")","category":"page"},{"location":"getting_started/#Basic-usage-1","page":"Getting started","title":"Basic usage","text":"","category":"section"},{"location":"getting_started/#","page":"Getting started","title":"Getting started","text":"To load the package, use the command:","category":"page"},{"location":"getting_started/#","page":"Getting started","title":"Getting started","text":"using FeedbackParticleFilters","category":"page"},{"location":"getting_started/#","page":"Getting started","title":"Getting started","text":"Set up a basic one-dimensional linear-Gaussian continuous-time filtering problem:","category":"page"},{"location":"getting_started/#","page":"Getting started","title":"Getting started","text":"using Distributions\nstate_model = ScalarDiffusionStateModel(x->-x, x->sqrt(2.), Normal())\nobs_model   = ScalarDiffusionObservationModel(x->x)\n\nfilt_prob = ContinuousTimeFilteringProblem(state_model, obs_model)","category":"page"},{"location":"getting_started/#","page":"Getting started","title":"Getting started","text":"Once the filtering problem is defined, you can use it to perform a variety of tasks.","category":"page"},{"location":"getting_started/#","page":"Getting started","title":"Getting started","text":"For example, you may initialize an ensemble of N=100 particles:","category":"page"},{"location":"getting_started/#","page":"Getting started","title":"Getting started","text":"ensemble = UnweightedParticleEnsemble(state_model, 100)","category":"page"},{"location":"getting_started/#","page":"Getting started","title":"Getting started","text":"The following generates a Poisson equation for the gain using the ensemble above. The equation is solved using the semigroup gain estimation method.","category":"page"},{"location":"getting_started/#","page":"Getting started","title":"Getting started","text":"eq = GainEquation(state_model, obs_model, ensemble)\nmethod = SemigroupMethod(1E-1,1E-2)\nsolve!(eq, method)","category":"page"},{"location":"getting_started/#","page":"Getting started","title":"Getting started","text":"The gain at the particle locations is stored in eq.gain. These low-level building blocks can then be used to write custom numerical implementations. The package also comes with methods to automatically simulate a given filtering problem:","category":"page"},{"location":"getting_started/#","page":"Getting started","title":"Getting started","text":"filter = FPF(filt_prob, method, 100)\nsimulation = ContinuousTimeSimulation(filt_prob, filter, 10000, 0.01)\nrun!(simulation)","category":"page"},{"location":"filtering/#Brief-intro-to-filtering-1","page":"Brief intro to filtering","title":"Brief intro to filtering","text":"","category":"section"},{"location":"filtering/#","page":"Brief intro to filtering","title":"Brief intro to filtering","text":"Here's some inline maths: sqrtn1 + x + x^2 + ldots.","category":"page"},{"location":"filtering/#","page":"Brief intro to filtering","title":"Brief intro to filtering","text":"fracnk(n - k) = binomnk","category":"page"},{"location":"fpf/#Feedback-particle-filters-1","page":"Feedback particle filters","title":"Feedback particle filters","text":"","category":"section"},{"location":"hidden/#Hidden-state-models-1","page":"Hidden state models","title":"Hidden state models","text":"","category":"section"},{"location":"observation/#Observation-models-1","page":"Observation models","title":"Observation models","text":"","category":"section"},{"location":"gainest/#Gain-estimation-1","page":"Gain estimation","title":"Gain estimation","text":"","category":"section"},{"location":"reference/#Reference-1","page":"Reference","title":"Reference","text":"","category":"section"},{"location":"reference/#","page":"Reference","title":"Reference","text":"Contents","category":"page"},{"location":"reference/#","page":"Reference","title":"Reference","text":"CurrentModule = FeedbackParticleFilters","category":"page"},{"location":"reference/#","page":"Reference","title":"Reference","text":"Pages = [\"reference.md\"]","category":"page"},{"location":"reference/#Basic-abstractions-1","page":"Reference","title":"Basic abstractions","text":"","category":"section"},{"location":"reference/#","page":"Reference","title":"Reference","text":"AbstractHiddenState\nVectorHiddenState\nAbstractFilterRepresentation\nParticleRepresentation\nUnweightedParticleRepresentation\nAbstractGainEquation\nEmptyGainEquation","category":"page"},{"location":"reference/#FeedbackParticleFilters.AbstractFilterRepresentation","page":"Reference","title":"FeedbackParticleFilters.AbstractFilterRepresentation","text":"AbstractFilterRepresentation{S}\n\nAbstract type for representation of the conditional distribution over the hidden state of type S.\n\n\n\n\n\n","category":"type"},{"location":"reference/#FeedbackParticleFilters.ParticleRepresentation","page":"Reference","title":"FeedbackParticleFilters.ParticleRepresentation","text":"ParticleRepresentation{S} <: AbstractFilterRepresentation{S}\n\nAbstract type for the representation of the conditional distribution over the hidden state by particles (samples), weighted or unweighted.\n\n\n\n\n\n","category":"type"},{"location":"reference/#FeedbackParticleFilters.UnweightedParticleRepresentation","page":"Reference","title":"FeedbackParticleFilters.UnweightedParticleRepresentation","text":"UnweightedParticleRepresentation{S} <: ParticleRepresentation{S} <: AbstractFilterRepresentation{S}\n\nAbstract type for the representation of the conditional distribution over the hidden state by unweighted (i.e. equally weighted) particles (samples).\n\n\n\n\n\n","category":"type"},{"location":"reference/#Basic-methods-1","page":"Reference","title":"Basic methods","text":"","category":"section"},{"location":"reference/#","page":"Reference","title":"Reference","text":"eltype\nMap","category":"page"},{"location":"reference/#Base.eltype","page":"Reference","title":"Base.eltype","text":"eltype(ensemble::ParticleRepresentation)\n\nReturn the type of individual particles in ensemble.\n\n\n\n\n\n","category":"function"},{"location":"reference/#Hidden-state-models-1","page":"Reference","title":"Hidden state models","text":"","category":"section"},{"location":"reference/#","page":"Reference","title":"Reference","text":"StateModel\nDiffusionStateModel\nScalarDiffusionStateModel\nPropagator","category":"page"},{"location":"reference/#FeedbackParticleFilters.DiffusionStateModel","page":"Reference","title":"FeedbackParticleFilters.DiffusionStateModel","text":"DiffusionStateModel(f::Function, g::Function, init)\n\nA diffusion process hidden state model dX_t = f(X_t)dt + g(X_t)dW_t, where f is the drift_function, g is the observation_function, Xt is the n-dimensional hidden state at time t, and Wt is an m-dimensional Brownian motion process.\n\nArgument init stands for the initial condition of the process, which is either\n\nA vector of length n for a fixed (deterministic) initial condition\nA Distributions.Sampleable type for a random initial condition\n\n\n\n\n\n","category":"type"}]
}