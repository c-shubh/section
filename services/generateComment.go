package services

import (
	"math"
	"strings"
)

func getLeftPadding(unusedLength int, repeatChar rune) string {
	var count = int(math.Floor(float64(unusedLength) * 0.5))
	return strings.Repeat(string(repeatChar), count)
}

func getRightPadding(unusedLength int, repeatChar rune) string {
	var count = int(math.Ceil(float64(unusedLength) * 0.5))
	return strings.Repeat(string(repeatChar), count)
}

func GenerateComment(text string) string {
	var lineLength = 80
	var open = "/*"
	var gapAfterOpen = " "
	var gapBeforeText = " "
	var gapAfterText = " "
	var gapBeforeClose = " "
	var close = "*/"
	var repeatChar = '-'

	var leftBuilder strings.Builder
	leftBuilder.WriteString(open)
	leftBuilder.WriteString(gapAfterOpen)

	var midBuilder strings.Builder
	midBuilder.WriteString(gapBeforeText)
	midBuilder.WriteString(text)
	midBuilder.WriteString(gapAfterText)

	var rightBuilder strings.Builder
	rightBuilder.WriteString(gapBeforeClose)
	rightBuilder.WriteString(close)

	var unusedLength = lineLength - leftBuilder.Len() - midBuilder.Len() - rightBuilder.Len()
	return leftBuilder.String() +
		getLeftPadding(unusedLength, repeatChar) +
		midBuilder.String() +
		getRightPadding(unusedLength, repeatChar) +
		rightBuilder.String()
}
