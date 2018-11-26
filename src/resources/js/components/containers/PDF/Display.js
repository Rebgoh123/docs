import React from 'react';
import PDF from 'reactjs-pdf';
import LeftIcon from '@material-ui/icons/arrowback';
import RightIcon from '@material-ui/icons/arrowforward';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';

export class MyPdfViewer  extends React.Component {
    state = {};

    onDocumentComplete = (pages) => {
        this.setState({ page: 1, pages,pagePreview:1  + "/" + pages });
    }

    handlePrevious = () => {
        this.setState({ page: this.state.page - 1,pagePreview:this.state.page - 1 + "/" + this.state.pages });
    }

    handleNext = () => {
        this.setState({ page: this.state.page + 1,pagePreview:this.state.page + 1 + "/" + this.state.pages});
    }

    handleChange= (e) => {
        var p = e.target.value;
        this.setState({ pagePreview: e.target.value });

        if(p !== null && p !== undefined && p !== "" && p <= this.state.pages) {
            console.log("change")
            console.log(p)
            console.log("end change")
             this.setState({ page:  parseInt(e.target.value)});
        }

        //console.log(newItems)
    }

    renderPagination = (page, pages) => {
        let previousButton =<Button variant="fab" mini color="secondary" aria-label="Add" onClick={this.handlePrevious}>
            <LeftIcon />
        </Button>

        if (page === 1) {
            previousButton =<Button  disabled variant="fab" mini color="secondary" aria-label="Add">
                <LeftIcon />
            </Button>
        }


        let nextButton =   <Button variant="fab" mini color="secondary" aria-label="Add" onClick={this.handleNext}>
            <RightIcon />
        </Button>
        if (page === pages) {
            nextButton = <Button disabled variant="fab" mini color="primary" aria-label="Add" >
                <RightIcon />
            </Button>
        }
        return (
            <nav>

                <ul className="pager" style={{justifyContent: 'center',alignItems: 'center'}} >

                    {previousButton}
                    <Input
                        value={this.state.pagePreview}
                        onChange={this.handleChange}
                        style={{maxWidth:"50px", border:'1px solid',textAlign: 'center', padding:'5px', mading:'5px'}}
                    />
                    {nextButton}
                </ul>
            </nav>
        );
    }

    render() {
        let pagination = null;
        if (this.state.pages) {
            pagination = this.renderPagination(this.state.page, this.state.pages);
        }
        return (
            <div >

                {pagination}

                <div className="public-PDF-content">
                <PDF
                    file={this.props.src}
                    onDocumentComplete={this.onDocumentComplete}
                    page={this.state.page}
                />
                </div>


            </div>

        )
    }
}

